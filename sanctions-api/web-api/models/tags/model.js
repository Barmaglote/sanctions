const mongoose = require('mongoose')
const tagsSchema = require('./schema.js')

const TagsModel = mongoose.model('tags', tagsSchema)
module.exports = TagsModel
