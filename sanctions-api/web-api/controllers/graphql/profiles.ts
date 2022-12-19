import { GraphQLError } from 'graphql'
import ProfileModel from '../../models/profiles/model.js'

const EMPTY_PROFILE = {
  nickname: null,
  login: null,
  info: null
}

export async function GetProfile(nickname: String, login: String) {
  let profile = null

  if (nickname) {
    profile = await ProfileModel.findOne({ "nickname": nickname.trim().toLowerCase() })
  }

  if (!nickname && login) {
    profile = await ProfileModel.findOne({ "login": login.trim().toLowerCase() })
  }

  return profile
}

export async function AddProfile(nickname: String, login: String) {
  if (!nickname || !login) {
    return EMPTY_PROFILE
  }

  nickname = nickname.trim().toLowerCase()
  login = login.trim().toLowerCase()

  let profile = await ProfileModel.findOne({ nickname })
  if (profile && profile.login?.trim().toLowerCase() === login) {
    return profile
  }

  if (profile && profile.login?.trim().toLowerCase() !== login) {
    throw new GraphQLError('Profile name is occupied already')
  }

  profile = await ProfileModel.findOne({ login: "evgeniy.danilchenko@gmail.com" })
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
      profile = await ProfileModel.create({ login, nickname })
      await profile.save()
    } catch (error) {  
      throw new GraphQLError('Unable to create profile')
    }
  }

  return profile || EMPTY_PROFILE
}