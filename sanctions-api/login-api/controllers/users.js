import { Send } from './../helpers/response.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from './../models/users/model.js';

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
        const hashPassword = await bcrypt.hash(password, 10);
        const confirmation = await bcrypt.hash(login, 10);

        const user = await User.create({ 
            login: login.toLowerCase().trim(),
            username: username, 
            password: hashPassword, 
            confirmed: true, //TODO: fix, when e-mail service is done 
            confirmation
        });

        await user.save();
        console.log("User is saved");

        SendConfirmation(login, confirmation);
        Send(res, 200, { "status": "success", login: login, username: username });    
    } catch {
        Send(res, 500, { "status": "failed" });
    }    

    return;
};

export async function ChangePassword(req, res) {
    const { login, oldpassword, password } = req.body;
        
    if (!login || !password || !oldpassword) {
        JSONResponse.Send(res, 500, { "status": "failed" });
        return;
    }
    
    let user = await User.findOne({login:login.toLowerCase().trim(), confirmed: true}).exec();

    if (!user) {
        Send(res, 500, { "status": "failed" });
        return;
    }
    
    try {
        if (await bcrypt.compare(oldpassword, user.password)) {            
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
            user.confirmation = await bcrypt.hash("65465465sdasdaswvcxv", 10); // TODO: Make it correct way            
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

export async function RestorePassword(req, res) {
    const { login } = req.body;

    if (!login ) {
        JSONResponse.Send(res, 500, { "status": "failed" });
        return;
    }

    let user = await User.findOne({login:login.toLowerCase().trim(), confirmed: true}).exec();

    if (!user) {
        Send(res, 500, { "status": "failed" });
        return;
    }
    
    try {        
        let changeCode = await bcrypt.hash("666666666666", 10); // TODO: generate code
        SendChangePasswordRequest(login, changeCode);
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