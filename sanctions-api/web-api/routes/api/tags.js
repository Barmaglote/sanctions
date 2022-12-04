const express = require('express')
const router = express.Router()

const controllers = require('../../controllers/tags.js')

router.get('/', controllers.Tags)

module.exports = router
