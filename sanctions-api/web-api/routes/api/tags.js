var express = require("express");
var router = express.Router();

var controllers = require("../../controllers/tags.js");
var authenticateToken = require('./authentication');

router.get("/", authenticateToken, controllers.Tags);

module.exports = router;

