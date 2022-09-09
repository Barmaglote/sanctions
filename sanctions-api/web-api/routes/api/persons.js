var express = require("express");
var router = express.Router();
var controllers = require("../../controllers/persons.js");

router.get("/", controllers.Persons);

module.exports = router;

