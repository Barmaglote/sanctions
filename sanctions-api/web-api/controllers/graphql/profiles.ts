import ProfileModel from '../../models/profiles/model.js'

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