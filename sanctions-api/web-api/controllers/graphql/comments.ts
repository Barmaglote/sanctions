import { GraphQLError } from 'graphql'
import CommentsModel from '../../models/comments/model.js'

const STANDARD_PAGE = 50

export async function GetComments(reputation_object_id: string, first: number = 0, rows: number = STANDARD_PAGE) {

  if (!reputation_object_id) {
    throw new GraphQLError('Reputation id is not set')
  }

  return await CommentsModel.find({reputation_object_id}).sort('id').skip(first).limit(rows)
}

export async function AddComment(reputation_object_id: string, login: string, comment: string) {
  if (!reputation_object_id || !login || !comment) {
    throw new GraphQLError('Nothing to add')
  }

  reputation_object_id = reputation_object_id.trim().toLowerCase()
  login = login.trim().toLowerCase()

  let comments = await CommentsModel.findOne({ reputation_object_id, login, comment })
  if (comments) {
    throw new GraphQLError('Do not repeat yourself')
  }

  try {
    comments = await CommentsModel.create({ reputation_object_id, login, comment })
    await comments.save()
  } catch (error) {
    throw new GraphQLError('Unable to add comments')
  }

  return comments
}