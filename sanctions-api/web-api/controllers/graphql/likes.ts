import LikesModel from '../../models/likes/model.js'
import { GraphQLError } from 'graphql'

export async function AddLike(reputationObjectId: string, isPositive: boolean, authorId: string) {
  console.log("webapi AddLike", reputationObjectId, authorId)
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
    like = await LikesModel.create({ reputationObjectId, authorId, isPositive, createdAt: createdAt.toISOString() })
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

  if  (reputationObjectId == "62ffba3b6a9f4c2a32250dba") return 153654;

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