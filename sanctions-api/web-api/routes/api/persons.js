var express = require("express");
var router = express.Router();

var controllers = require("../../controllers/persons.js");
var authenticateToken = require('./authentication');

router.get("/", authenticateToken, controllers.Persons);

module.exports = router;

