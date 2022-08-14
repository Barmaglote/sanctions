var express = require("express");
var router = express.Router();

var controllers = require("../../controllers/tags.js");

router.get("/", controllers.Tags);

module.exports = router;

