import express from "express";
var router = express.Router();

import { Register, Login, RefreshAccessToken } from "../../controllers/users.js";


router.post("/signup", Register);
router.post("/signin", Login);
router.post("/refresh-token", RefreshAccessToken);

export function getRoutesAPIUsers() {
    return router;
}