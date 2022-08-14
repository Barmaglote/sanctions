import express from "express";
var router = express.Router();

import { Register, Login, RefreshAccessToken, ChangePassword, RequestRestorePassword, RestorePassword } from "../../controllers/users.js";

router.post("/signup", Register);
router.post("/signin", Login);
router.post("/changepassword", ChangePassword);
router.post("/requestrestore", RequestRestorePassword);
router.post("/restore", RestorePassword);
router.post("/refresh-token", RefreshAccessToken);

export function getRoutesAPIUsers() {
    return router;
}