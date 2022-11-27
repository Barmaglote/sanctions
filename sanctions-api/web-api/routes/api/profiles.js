var express = require("express");
var router = express.Router();
var authentication = require('./authentication');

var controllers = require("../../controllers/profiles.js");

router.get("/public", controllers.GetPublic);
router.get("/private", authentication, controllers.GetPrivate);
router.put("/", authentication, controllers.Update);
router.post("/", authentication, controllers.Create);

module.exports = router;