var express = require("express");
var router = express.Router();

var controllers = require("../../controllers/links.js");
var authenticateToken = require('./authentication');

router.get("/", authenticateToken, controllers.Links);

module.exports = router;