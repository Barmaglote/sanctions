const express = require('express')
const router = express.Router()

const controllers = require('../../controllers/links.js')

router.get('/', controllers.Links)

module.exports = router
