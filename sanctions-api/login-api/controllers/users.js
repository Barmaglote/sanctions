import { Send } from './../helpers/response.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from './../models/users/model.js';
import crypto from 'node:crypto';
import { ChangePasswordTokenRepository } from '../repository/redis/ChangePasswordTokenRepository.js';

export async function Register(req, res) {
    const { login, username, password } = req.body;

    if (!login || !password || !username) {
        Send(res, 500, { "status": "failed" });
        return;
    }

    const exists = await User.exists({login: login.toLowerCase().trim()}); 

    if (exists) {
        Send(res, 500, { "status": "failed", "message": `Users ${login} already exists`});
        return;
    }

    try {
        const salt = await bcrypt.genSalt(); 
        const hashPassword = await bcrypt.hash(password, salt);
        const confirmation = crypto.randomBytes(128).toString('base64');

        const user = await User.create({ 
            login: login.toLowerCase().trim(),
            username: username, 
            password: hashPassword,
            salt: salt, 
            confirmed: true, //TODO: fix, when e-mail service is done 
            confirmation
        });

        await user.save();
        loggerlogin.info("User " + user.login + " is registred");

        SendConfirmation(login, confirmation);
        Send(res, 200, { "status": "success", login: login, username: username });    
    } catch {
        Send(res, 500, { "status": "failed" });
    }    

    return;
};

export async function RestorePassword(req, res) {
    const { password, token } = req.body;
        
    if (!password || !token) {
        Send(res, 500, { "status": "failed" });
        return;
    }
    
    let changetoken = await ChangePasswordTokenRepository.search().where('token').is.equalTo(token).return.first();

    if (!changetoken) {
        Send(res, 500, { "status": "failed" });
        return;        
    }

    let user = await User.findOne({login:changetoken.login.toLowerCase().trim(), confirmed: true}).exec();

    if (!user) {
        Send(res, 500, { "status": "failed" });
        return;
    }
    
    try {
        const salt = await bcrypt.genSalt(); 
        const hashPassword = await bcrypt.hash(password, salt);
        user.password = hashPassword;
        user.confirmation = crypto.randomBytes(128).toString('hex');         
        user.save();
        SendChangePasswordRequest(user.login, user.confirmation);
        Send(res, 200, { "status": "success" });
     } catch {
        Send(res, 500, { "status": "failed" });
     }    
};


export async function ChangePassword(req, res) {
    const { login, oldpassword, password } = req.body;
        
    if (!login || !password || !oldpassword) {
        Send(res, 500, { "status": "failed" });
        return;
    }
    
    let user = await User.findOne({login:login.toLowerCase().trim(), confirmed: true}).exec();

    if (!user) {
        Send(res, 500, { "status": "failed" });
        return;
    }
    
    try {
        if (await bcrypt.compare(oldpassword, user.password)) {            
            const salt = await bcrypt.genSalt(); 
            const hashPassword = await bcrypt.hash(password, salt);
            user.password = hashPassword;
            user.confirmation = crypto.randomBytes(128).toString('base64');         
            user.save();
            SendChangePasswordRequest(user.login, user.confirmation);
            Send(res, 200, { "status": "success" });
        } else {
            Send(res, 500, { "status": "failed" });
        }
     } catch {
        Send(res, 500, { "status": "failed" });
     }    
};

export async function RequestRestorePassword(req, res) {
    const { login } = req.body;

    if (!login ) {
        Send(res, 500, { "status": "failed" });
        return;
    }

    let user = await User.findOne({login:login.toLowerCase().trim(), confirmed: true}).exec();

    if (!user) {
        Send(res, 500, { "status": "failed" });
        return;
    }
    
    try {        
        let changeCode = crypto.randomBytes(128).toString('hex');
        let previoustoken = await ChangePasswordTokenRepository.search().where('login').is.equalTo(login).return.all();
        if (previoustoken && previoustoken.length > 0) {
            ChangePasswordTokenRepository.remove(previoustoken[0].entityId);
        }
        
        let token = await ChangePasswordTokenRepository.createAndSave({token: changeCode, login: login});
        if (token) {
            console.log(token.token);
            ChangePasswordTokenRepository.expire(token.entityId, 10*60*1000); // 10 mins
            SendChangePasswordRequest(login, changeCode);
        }
        
        Send(res, 200, { "status": "success" });
     } catch {
        Send(res, 500, { "status": "failed" });
     }

     return;
};

export async function Login(req, res) {

    const { login, password } = req.body;

    if (!login || !password) {
        Send(res, 500, { "status": "failed" });
        return;    
    }

    let user = await User.findOne({login:login.toLowerCase().trim(), confirmed: true}).exec();

    if (!user || !user.password) {
        Send(res, 500, { "status": "failed" });
        return;
    }

    try {
        const isPasswordEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordEqual) {
            Send(res, 500, { "status": "failed" });
        }

        let payload = { "login": user.login, "username": user.username };
        const access_token = GenerateAccessToken(payload);
        const refresh_token = GenerateRefreshToken(payload);

        Send(res, 200, { "status": "success", "accessToken": access_token, "refreshToken": refresh_token, login: user.login, username: user.username });

    } catch (e) {
        console.log(e);
        Send(res, 500, { "status": "failed" });
    }
};

export async function RefreshAccessToken(req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        Send(res, 401, { "status": "failed" });
        return;
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            Send(res, 403, { "status": "failed" });
            return;
        }

        const access_token = GenerateAccessToken({ login: user.login, username: user.username });
        Send(res, 200, { "status": "success", "accessToken": access_token });
        return;
    });
};

function SendConfirmation(login, confirmation) {
    console.log(login, confirmation);
}

function SendChangePasswordRequest(login, changeCode) {
    console.log(login, changeCode); // TODO: Save code to redis with TTL
}

function GenerateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN });
}

function GenerateRefreshToken(payload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
}