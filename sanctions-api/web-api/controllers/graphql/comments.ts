import { GraphQLError } from 'graphql'
import CommentsModel from '../../models/comments/model.js'

const STANDARD_PAGE = 50

export async function GetComments(reputationObjectId: string, lazyLoadEvent = null) {
  if (!reputationObjectId) {
    throw new GraphQLError('Reputation id is not set')
  }

  const { first, rows } = lazyLoadEvent || { first: 0, rows: STANDARD_PAGE }
  return await CommentsModel.find({reputationObjectId, parentId: null}).sort({'createdAt': -1}).skip(first).limit(rows)
}

export async function GetCommentsTotal(reputationObjectId: string) {
  if (!reputationObjectId) {
    throw new GraphQLError('Reputation id is not set')
  }

  return await CommentsModel.count({reputationObjectId, "parentId": null})
}

export async function AddComment(reputationObjectId: string, parentId: string, comment: string, login: string) {
  if (!reputationObjectId || !login || !comment) {
    throw new GraphQLError('Nothing to add')
  }

  reputationObjectId = reputationObjectId.trim().toLowerCase()
  login = login.trim().toLowerCase()

  let comments = await CommentsModel.findOne({ reputationObjectId, login, comment, parentId })
  if (comments) {
    throw new GraphQLError('Do not repeat yourself')
  }

  try {
    var createdAt = new Date()
    console.log(createdAt.toISOString())

    comments = await CommentsModel.create({ reputationObjectId, login, comment, parentId, createdAt: createdAt.toISOString() })
    await comments.save()
  } catch (error) {
    throw new GraphQLError('Unable to add comments')
  }

   return comments
}

export async function ComputeComments(parent) {
  return await CommentsModel.find({parentId: parent.id })
}