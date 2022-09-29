import express from "express";
import { authenticateToken } from './authentication.js';
var router = express.Router();

import { Register, Login, RefreshAccessToken, ChangePassword, RequestRestorePassword, RestorePassword, ConfirmPasswordChange, CurrentUser } from "../../controllers/users.js";

router.post("/signup", Register);
router.post("/signin", Login);
router.post("/changepassword", authenticateToken, ChangePassword);
router.post("/confirm", ConfirmPasswordChange);
router.post("/requestrestore", RequestRestorePassword);
router.post("/restore", RestorePassword);
router.post("/refresh-token", RefreshAccessToken);
router.get("/user", authenticateToken, CurrentUser);

export function getRoutesAPIUsers() {
    return router;
}