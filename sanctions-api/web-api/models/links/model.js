import mongoose from 'mongoose'
import { linksSchema } from './schema.js'

export default mongoose.model('links', linksSchema)
