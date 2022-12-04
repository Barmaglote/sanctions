const mongoose = require('mongoose')
const linksSchema = require('./schema.js')

const LinksModel = mongoose.model('links', linksSchema)
module.exports = LinksModel
