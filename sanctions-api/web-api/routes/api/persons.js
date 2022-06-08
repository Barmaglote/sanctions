var express = require("express");
var router = express.Router();
const jwt = require('jsonwebtoken');

var controllers = require("../../controllers/persons.js");

router.get("/", authenticateToken, controllers.Persons);

module.exports = router;


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};