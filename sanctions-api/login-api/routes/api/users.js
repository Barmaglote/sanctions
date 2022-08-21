import express from "express";
import { authenticateToken } from './authentication.js';
var router = express.Router();

import { Register, Login, RefreshAccessToken, ChangePassword, RequestRestorePassword, RestorePassword, ConfirmPasswordChange } from "../../controllers/users.js";

router.post("/signup", Register);
router.post("/signin", Login);
router.post("/changepassword", authenticateToken, ChangePassword);
router.post("/confirm", ConfirmPasswordChange);
router.post("/requestrestore", RequestRestorePassword);
router.post("/restore", RestorePassword);
router.post("/refresh-token", RefreshAccessToken);

export function getRoutesAPIUsers() {
    return router;
}