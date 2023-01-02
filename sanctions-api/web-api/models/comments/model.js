import mongoose from 'mongoose'
import { commentsSchema } from './schema.js'

const CommentsModel = mongoose.model('comments', commentsSchema)
export default CommentsModel