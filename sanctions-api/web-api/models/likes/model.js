import mongoose from 'mongoose'
import { likesSchema } from './schema.js'

const LikesModel = mongoose.model('likes', likesSchema)
export default LikesModel