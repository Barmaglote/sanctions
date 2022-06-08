import express from "express";
var router = express.Router();

import { Users, Register, Login, Logout, Token } from "../../controllers/users.js";

router.get("/", Users);
router.post("/", Register);
router.post("/login", Login);
router.delete("/logout", Logout);
router.post("/token", Token);

export default router;