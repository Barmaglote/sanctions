import { GraphQLError } from 'graphql'
import CommentsModel from '../../models/comments/model.js'
import getUserById from '../external/users.js'

const STANDARD_PAGE = 50

export async function GetComments(reputationObjectId: string, lazyLoadEvent = null) {
  if (!reputationObjectId) {
    throw new GraphQLError('Reputation id is not set')
  }

  const { first, rows } = lazyLoadEvent || { first: 0, rows: STANDARD_PAGE }
  return await CommentsModel.find({reputationObjectId, parentId: null}).sort({'createdAt': -1}).skip(first).limit(rows)
}

export async function GetCommentsTotal(reputationObjectId: string, onlyParent: boolean = true) {
  if (!reputationObjectId) {
    throw new GraphQLError('Reputation id is not set')
  }
  
  if (onlyParent === true) {
    return await CommentsModel.count({reputationObjectId, "parentId": null})
  } else {
    return await CommentsModel.count({reputationObjectId})
  }  
}

export async function GetCommentsTotalForParent(parent) {
  return GetCommentsTotal(parent._id, false);
}

export async function AddComment(reputationObjectId: string, parentId: string, comment: string, authorId: string) {
  if (!reputationObjectId || !authorId || !comment) {
    throw new GraphQLError('Nothing to add')
  }

  reputationObjectId = reputationObjectId.trim().toLowerCase()

  let comments = await CommentsModel.findOne({ reputationObjectId, authorId, comment, parentId })
  if (comments) {
    throw new GraphQLError('Do not repeat yourself')
  }

  try {
    var createdAt = new Date()  
    comments = await CommentsModel.create({ reputationObjectId, authorId, comment, parentId, createdAt: createdAt.toISOString() })
    await comments.save()
  } catch (error) {
    throw new GraphQLError('Unable to add comments')
  }

   return comments
}

export async function ComputeComments(parent) {
  return await CommentsModel.find({parentId: parent.id })
}

export async function ComputeAuthor(parent) {
  if (!parent?.authorId) { return null; } 
  return await getUserById(parent?.authorId)
}