import { GraphQLError } from 'graphql'
import ProfileModel from '../../models/profiles/model.js'
import { SubscribtionInput } from '../../models/profiles/subscribtionInput.js'

export async function GetSubscribersTotal(reputationObjectId: String) {

  if (!reputationObjectId) {
    throw new GraphQLError('Reputation object is not found');  
  }

  const amount = await ProfileModel.count({ "subscribtions.objectId": reputationObjectId })

  return amount;
}

export async function GetSubscribtions(userId: String) {

  if (!userId) {
    throw new GraphQLError('User id is not found')  
  }

  const profile = await ProfileModel.findOne({ userId })

  return profile === null ? [] : profile.subscribtions
}

export async function IsSubscribed(userId: String, reputationObjectId: String) {

  if (!userId || !reputationObjectId) {
    throw new GraphQLError('User or reputation objetst is not found');  
  }

  const profile = await ProfileModel.findOne({ userId })

  return profile.subscribtions.some(s => s.objectId === reputationObjectId);
}

export async function UpdateSubscribtion(subscribtionInput: SubscribtionInput, currentUserId: string) {
  if (!subscribtionInput || !subscribtionInput.userId || !subscribtionInput.reputationObjectId || !subscribtionInput.reputationObjectType) {
    return false
  }

  if (currentUserId !== subscribtionInput.userId ) {
    throw new GraphQLError('You are not allowed to update subscribtion of another person')
  }

  let profile = await ProfileModel.findOne({ userId: subscribtionInput.userId })

  if (!profile) {
    throw new GraphQLError('Profile is not exits. Create profile before.')
  }

  if (profile.subscribtions == null || profile.subscribtions.length === 0) {
    profile.subscribtions = []
  }

  let result = false; 

  if (profile.subscribtions.some(x => x.objectId === subscribtionInput.reputationObjectId)) {
    profile.subscribtions = profile.subscribtions.filter(x => x.objectId !== subscribtionInput.reputationObjectId);
    result = false;
  } else {
    profile.subscribtions.push({ objectId: subscribtionInput.reputationObjectId, objectType: subscribtionInput.reputationObjectType });
    result = true;
  }

  await profile.save()

  return result;
}