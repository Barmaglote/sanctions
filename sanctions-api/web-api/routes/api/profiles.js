const express = require('express')
const router = express.Router()
const authentication = require('./authentication')

const controllers = require('../../controllers/profiles.js')

router.get('/public', controllers.GetPublic)
router.get('/private', authentication, controllers.GetPrivate)
router.put('/', authentication, controllers.Update)
router.post('/', authentication, controllers.Create)

module.exports = router
