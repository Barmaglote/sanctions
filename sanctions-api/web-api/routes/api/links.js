var express = require("express");
var router = express.Router();

var controllers = require("../../controllers/links.js");
router.get("/", controllers.Links);

module.exports = router;