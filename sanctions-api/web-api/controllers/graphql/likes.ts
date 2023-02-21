import LikesModel from '../../models/likes/model.js'
import { GraphQLError } from 'graphql'

const page_size = 10;

export async function AddLike(reputationObjectId: string, isPositive: boolean, authorId: string, reputationObjectType: string) {
  if (!reputationObjectId || !authorId) {
    throw new GraphQLError('Nothing to add')
  }

  reputationObjectId = reputationObjectId.trim().toLowerCase()

  let like = await LikesModel.findOne({ reputationObjectId, authorId })
  if (like) {
    throw new GraphQLError('Do not repeat yourself')
  }

  try {
    var createdAt = new Date()  
    like = await LikesModel.create({ reputationObjectId, authorId, isPositive, createdAt: createdAt.toISOString(), reputationObjectType })
    await like.save()
  } catch (error) {
    throw new GraphQLError('Unable to add like')
  }

   return like
}

export async function GetLikesByReputationObjectId(reputationObjectId: string) {
  if (!reputationObjectId) {
    throw new GraphQLError('Object is not set')
  }

  return await LikesModel.countDocuments({reputationObjectId, isPositive: true}).exec();
}

export async function GetDislikesByReputationObjectId(reputationObjectId: string) {
  if (!reputationObjectId) {
    throw new GraphQLError('Object is not set')
  }

  return await LikesModel.countDocuments({reputationObjectId, isPositive: false}).exec();
}

export async function GetLike(reputationObjectId: string, authorId: string) {

  if (!reputationObjectId || !authorId) {
    throw new GraphQLError('Nothing to search')
  }

  reputationObjectId = reputationObjectId.trim().toLowerCase()

  let like = await LikesModel.findOne({ reputationObjectId, authorId }).exec()
  return like
}

export async function GetLikesFeed(userId: string, page: number = 0) {

  if (!userId) {
    throw new GraphQLError('Nothing to search')
  }

  const first = page * page_size

  return await LikesModel.find({authorId: userId}).sort({'createdAt': -1}).skip(first).limit(page_size).exec()
}

