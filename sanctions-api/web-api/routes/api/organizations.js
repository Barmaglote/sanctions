var express = require("express");
var router = express.Router();

var controllers = require("../../controllers/organizations.js");
var authenticateToken = require('./authentication');

router.get("/", authenticateToken, controllers.Organizations);

module.exports = router;

