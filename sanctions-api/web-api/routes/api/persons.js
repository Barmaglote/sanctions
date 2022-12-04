const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/persons.js')

router.get('/', controllers.Persons)

module.exports = router
