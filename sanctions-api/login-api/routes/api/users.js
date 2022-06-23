import express from "express";
var router = express.Router();

import { Users, Register, Login, Logout, Token, SetDB } from "../../controllers/users.js";

router.get("/", Users);
router.post("/", Register);
router.post("/login", Login);
router.delete("/logout", Logout);
router.post("/token", Token);

export function getRoutesAPIUsers(mongodb) {
    SetDB(mongodb);
    return router;
} 