import { GraphQLError } from 'graphql'
import CommentsModel from '../../models/comments/model.js'

const STANDARD_PAGE = 50
const STANDARD_SORTING_FIELD = 'createdAt'

export async function GetComments(reputationObjectId: string, lazyLoadEvent = null) {

  if (!reputationObjectId) {
    throw new GraphQLError('Reputation id is not set')
  }

  const { sortField, sortOrder, first, rows } = lazyLoadEvent || { sortField: STANDARD_SORTING_FIELD, sortOrder: -1, first: 0, rows: STANDARD_PAGE }
  const sorting = {}

  if (sortField && sortOrder) {
    sorting[sortField] = sortOrder === 'desc' ? -1 : sortOrder
  } else {
    sorting[STANDARD_SORTING_FIELD] = -1
  }

  return await CommentsModel.find({reputationObjectId}).sort({'createdAt': -1}).skip(first).limit(rows)
}

export async function GetCommentsTotal(reputationObjectId: string) {
  if (!reputationObjectId) {
    throw new GraphQLError('Reputation id is not set')
  }

  return await CommentsModel.count({reputationObjectId})
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
    comments = await CommentsModel.create({ reputationObjectId, login, comment, parentId, createdAt: createdAt.toISOString() })
    await comments.save()
  } catch (error) {
    throw new GraphQLError('Unable to add comments')
  }

   return comments
}