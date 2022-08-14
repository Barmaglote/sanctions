var express = require("express");
var router = express.Router();
var controllers = require("../../controllers/organizations.js");

router.get("/", controllers.Organizations);

module.exports = router;

