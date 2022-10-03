import express from "express";
import { authenticateToken } from './authentication.js';
import { recaptcha } from './recaptcha.js';
var router = express.Router();

import { Register, Login, RefreshAccessToken, ChangePassword, RequestRestorePassword, RestorePassword, ConfirmPasswordChange, CurrentUser, Logout } from "../../controllers/users.js";

router.post("/signup", Register);
router.post("/signin", recaptcha, Login);
router.post("/changepassword", authenticateToken, ChangePassword);
router.post("/confirm", ConfirmPasswordChange);
router.post("/requestrestore", RequestRestorePassword);
router.post("/restore", RestorePassword);
router.post("/refreshtoken", RefreshAccessToken);
router.get("/user", authenticateToken, CurrentUser);
router.post("/logout", authenticateToken, Logout);

export function getRoutesAPIUsers() {
    return router;
}