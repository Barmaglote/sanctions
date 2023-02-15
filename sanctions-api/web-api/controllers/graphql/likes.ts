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

  console.log("reputationObjectId 01", reputationObjectId);

  if (!reputationObjectId) {
    throw new GraphQLError('Object is not set')
  }

  console.log("reputationObjectId 02");
  console.log("reputationObjectId 03", await LikesModel.countDocuments({reputationObjectId, isPositive: true}).exec());

  return await LikesModel.countDocuments({reputationObjectId, isPositive: true}).exec();
}

export async function GetDislikesByReputationObjectId(reputationObjectId: string) {
  if (!reputationObjectId) {
    throw new GraphQLError('Object is not set')
  }

  return await LikesModel.countDocuments({reputationObjectId, isPositive: false}).exec();
}

export async function GetLike(reputationObjectId: string, authorId: string) {
  authorId = "62ffba3b6a9f4c2a32250dba"

  if (!reputationObjectId || !authorId) {
    throw new GraphQLError('Nothing to search')
  }

  reputationObjectId = reputationObjectId.trim().toLowerCase()

  let like = await LikesModel.findOne({ reputationObjectId, authorId }).exec()
  return like
}