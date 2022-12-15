import mongoose from 'mongoose'
import tagsSchema from './schema.js'

const TagsModel = mongoose.model('tags', tagsSchema)
export default TagsModel
