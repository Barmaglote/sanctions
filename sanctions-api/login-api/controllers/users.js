import { Send } from './../helpers/response.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { refreshTokenRepository } from '../repository/refreshTokensRepository.js';

var users = [];

export function Users(req, res) {
    Send(res, 200, users);
};

export async function Register(req, res) {
    const { login, password } = req.body;

    if (!login || !password) {
        Send(res, 500, { "status": "failed" });
        return;
    }

    if (users.some(x => x.login.toLowerCase().trim() == login.toLowerCase().trim())) {
        Send(res, 500, { "status": "failed" });
        return;
    }

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const confirmation = await bcrypt.hash(login, 10);
        let user = { login, password: hashPassword, confirmed: true, confirmation };
        users.push(user);
        SendConfirmation(login, confirmation);
        Send(res, 200, { "status": "success" });    
    } catch {
        Send(res, 500, { "status": "failed" });
    }    
};

export async function ChangePassword(req, res) {
    const { login, password, changeCode } = req.body;
    
    if (!login || !password || !changeCode) {
        JSONResponse.Send(res, 500, { "status": "failed" });
        return;
    }
    
    let user = users.find(x => x => x.login.toLowerCase().trim() == login.toLowerCase().trim() && x.confirmed);

    if (!user) {
        Send(res, 500, { "status": "failed" });
    }
    
    try {
        if (await bcrypt.compare(changeCode, user.changeCode)) {
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
            Send(res, 400, { "status": "success" });
        } else {
            Send(res, 500, { "status": "failed" });
        }
     } catch {
        Send(res, 500, { "status": "failed" });
     }    
};

export async function RequestChangePassword(req, res) {
    const { login } = req.body;
    
    if (!login ) {
        JSONResponse.Send(res, 500, { "status": "failed" });
        return;
    }
    
    let user = users.find(x => x => x.login.toLowerCase().trim() == login.toLowerCase().trim());

    if (!user) {
        Send(res, 500, { "status": "failed" });
    }
    
    try {        
        user.changeCode = await bcrypt.hash(password, 10);
        SendChangePasswordRequest(login, user.changeCode);
        Send(res, 400, { "status": "success" });
     } catch {
        Send(res, 500, { "status": "failed" });
     }    
};

export async function Login(req, res) {
    const { login, password } = req.body;

    if (!login || !password) {
        Send(res, 500, { "status": "failed" });
    }    

    let user = users.find(x => x => x.login.toLowerCase().trim() == login.toLowerCase().trim() && x.confirmed);

    if (!user) {
        Send(res, 500, { "status": "failed" });
    }

       if (await bcrypt.compare(password, user.password)) {
        let payload = { "login": user.login };
        const access_token = GenerateAccessToken(payload);
        const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
        const refreshToken = refreshTokenRepository.createEntity();
        refreshToken.refreshToken = refresh_token;
        refreshToken.login = user.login;
        const id = await refreshTokenRepository.save(refreshToken);
        await refreshTokenRepository.expire(id, process.env.REFRESH_TOKEN_EXPIRES_IN)

        Send(res, 200, { "status": "success", "accessToken": access_token, "refreshToken": refresh_token });
       } else {
        Send(res, 500, { "status": "failed" });
       }
    } catch (e) {
        console.log(e);
        Send(res, 500, { "status": "failed" });
    }
};

export async function Token(req, res) {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
        Send(res, 401, { "status": "failed" });
    }

    let token = null;
    try {
        token = await refreshTokenRepository.search()
        .where('refreshToken')
        .equals(refreshToken)
        .return.all();        
    } catch (error) {
        Send(res, 401, { "status": "failed" });
    }

    if (!token || !token[0]) {
        Send(res, 403, { "status": "failed" });
    } 

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            Send(res, 403, { "status": "failed" });
        }

        const access_token = GenerateAccessToken({ login: user.login });
        Send(res, 200, { "status": "success", "accessToken": access_token });
    });
};

export async function Logout(req, res) {

    let token = null;
    try {
        token = await refreshTokenRepository.search()
        .where('refreshToken')
        .equals(req.body.refreshToken)
        .return.all();

        if (!token || !token[0]) {
            Send(res, 500, { "status": "failed" });
        }
    } catch(error) {
        console.log(error);
        Send(res, 500, { "status": "failed" });
    }


    if (!token[0].entityId) {
        Send(res, 500, { "status": "failed" });
    }
    
    try {
        await refreshTokenRepository.remove(token[0].entityId);
        Send(res, 200, { "status": "success" });
    } catch (error) {
        console.log(error);
        Send(res, 500, { "status": "failed" });        
    }  
};

function SendConfirmation(login, confirmation) {
    console.log(login, confirmation);
}

function SendChangePasswordRequest(login, changeCode) {
    console.log(login, changeCode);
}

function GetRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function GenerateAccessToken(payload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {  expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
}