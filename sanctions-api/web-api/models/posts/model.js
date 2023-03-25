import mongoose from 'mongoose'
import { postsSchema } from './schema.js'

const PostsModel = mongoose.model('posts', postsSchema)
export default PostsModel