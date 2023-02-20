import { GraphQLError } from 'graphql'
import ProfileModel from '../../models/profiles/model.js'
import { Profile } from '../../models/profiles/profile'
import sanitizer from 'sanitizer'

const EMPTY_PROFILE = {
  nickname: null,
  userId: null,
  info: null
}

export async function GetProfile(userId: String, currentUserId: String) {
  let profile = EMPTY_PROFILE

  if (userId) {
    profile = await ProfileModel.findOne({ "userId": userId.trim() })
  }

  if (!userId && currentUserId) {
    profile = await ProfileModel.findOne({ "userId": currentUserId.trim() })
  }

  return profile
}

export async function AddProfile(nickname: String, userId: String) {

  if (!nickname || !userId || !userId) {
    return EMPTY_PROFILE
  }

  nickname = nickname.trim().toLowerCase()
  userId = userId.trim()

  let profile = await ProfileModel.findOne({ nickname })
  if (profile && profile.userId?.trim() === userId) {
    return profile
  }

  if (profile && profile.userId?.trim() !== userId) {
    throw new GraphQLError('Profile name is occupied already')
  }

  profile = await ProfileModel.findOne({ userId })
  if (profile) {
    try {
      profile.nickname = nickname.toString()
      await profile.save()
    } catch (error) {
      console.log(error)
      throw new GraphQLError('Unable to update nickname')
    }
  } else {
    try {
      profile = await ProfileModel.create({ userId, nickname })
      await profile.save()
    } catch (error) {  
      throw new GraphQLError('Unable to create profile')
    }
  }

  return profile || EMPTY_PROFILE
}

export async function UpdateProfile(profile: Profile, currentUserId: String) {
  if (!profile || !profile.nickname || !profile?.userId || !currentUserId || profile.userId.toLowerCase().trim() !== currentUserId.toLowerCase().trim()) {
    throw new GraphQLError('Unable to update profile')
  }

  let { nickname, userId, info } = profile

  nickname = nickname.trim().toLowerCase()
  userId = userId.trim().toLowerCase()
  info = sanitizer.sanitize(info)
  const filter = { userId }
  const update = { info, nickname }

  profile = await ProfileModel.findOneAndUpdate(filter, update, { new: true })

  return profile || EMPTY_PROFILE  
}