import dotenv from 'dotenv'
dotenv.config()
import { GraphQLError } from 'graphql'
import PostsModel from '../../models/posts/model.js'
import { databaseResponseTimeHistogram } from '../../utils/metrics.js'
import getUserById from '../external/users.js'
import { createLogger } from '../../helpers/logger.js'

const STANDARD_PAGE = 50
const logger = createLogger(process.env.SEQ_LOG_ADDR, process.env.SEQ_LOG_KEY);

export async function GetPost(_id) {
  var post = await PostsModel.findOne({ _id })
  post.viewed++
  post.save()
  return post
}

export async function GetPosts(authorId: string, lazyLoadEvent: any = null) {
  const { first, rows } = lazyLoadEvent || { first: 0, rows: STANDARD_PAGE }

  const metricsLabel = { operation: 'GetPosts' }
  const timer = databaseResponseTimeHistogram.startTimer()

  try {
    const result = PostsModel.find(authorId ? {authorId} : {}).sort({'createdAt': -1}).skip(first).limit(rows)
    timer({...metricsLabel, success: "true"})
    return result;
  } catch(e) {
    timer({...metricsLabel, success: "false"})
    logger.error(e);
  }
}

export async function GetPostsTotal(authorId: string, lazyLoadEvent: any = null) {
  if (authorId)  {
    return await PostsModel.count({authorId});
  } else {
    return await PostsModel.count();
  }
}

export async function GetPostsTotalForParent(parent) {
  return GetPostsTotal(parent._id, false);
}

export async function AddPost(authorId: string, title: string, preview: string, post: string, tags: string[]) {

  if (!authorId || !post || !title || !preview ) {
    throw new GraphQLError('Nothing to add')
  }

  let posts = await PostsModel.findOne({ authorId, post })
  if (posts) {
    throw new GraphQLError('Do not repeat yourself')
  }

  try {
    var createdAt = new Date()
    posts = await PostsModel.create({ authorId, title, preview, post, tags, createdAt: createdAt.toISOString() })
    await posts.save()
  } catch (error) {
    throw new GraphQLError('Unable to add post')
  }

   return posts
}

export async function ComputeAuthor(parent) {
  if (!parent?.authorId) { return null; } 
  return await getUserById(parent?.authorId)
}