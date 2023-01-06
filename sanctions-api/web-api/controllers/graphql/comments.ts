import { GraphQLError } from 'graphql'
import CommentsModel from '../../models/comments/model.js'

const STANDARD_PAGE = 50

export async function GetComments(reputationObjectId: string, first: number = 0, rows: number = STANDARD_PAGE) {

  if (!reputationObjectId) {
    throw new GraphQLError('Reputation id is not set')
  }

  return await CommentsModel.find({reputationObjectId}).sort('id').skip(first).limit(rows)
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
    comments = await CommentsModel.create({ reputationObjectId, login, comment, parentId })
    await comments.save()
  } catch (error) {
    throw new GraphQLError('Unable to add comments')
  }

   return comments
}