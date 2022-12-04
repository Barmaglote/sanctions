const mongoose = require('mongoose')
const personsSchema = require('./schema.js')

const PersonsModel = mongoose.model('persons', personsSchema)
module.exports = PersonsModel
