import mongoose from 'mongoose'
import { linksSchema } from './schema.js'

const LinksModel = mongoose.model('links', linksSchema)
export default LinksModel