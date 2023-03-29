import { GraphQLError } from 'graphql'
import PostsModel from '../../models/posts/model.js'
import getUserById from '../external/users.js'

const STANDARD_PAGE = 50

export async function GetPost(_id) {
  return await PostsModel.findOne({ _id })
}

export async function GetPosts(authorId: string, lazyLoadEvent: any = null) {
  const { first, rows } = lazyLoadEvent || { first: 0, rows: STANDARD_PAGE }
  if (authorId) {
    return await PostsModel.find({authorId}).sort({'createdAt': -1}).skip(first).limit(rows)
  } else {
    return await PostsModel.find().sort({'createdAt': -1}).skip(first).limit(rows)
  }
}

export async function GetPostsTotal(authorId: string, lazyLoadEvent: any = null) {
  if (authorId)  {
    return await PostsModel.count({authorId});
  } else {
    return await PostsModel.count();
  }
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