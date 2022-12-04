const mongoose = require('mongoose')
const profileSchema = require('./schema.js')

const ProfileModel = mongoose.model('profiles', profileSchema)
module.exports = ProfileModel
