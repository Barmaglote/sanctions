const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/organizations.js')

router.get('/', controllers.Organizations)

module.exports = router
