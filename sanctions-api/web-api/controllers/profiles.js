import * as JSONResponse from '../helpers/response.js'
import ProfileModel from '../models/profiles/model.js'
import logger from '../helpers/logger.js'

export async function GetPublic (req, res) {
  const { nickname } = req.query.params ? JSON.parse(req.query.params) : { nickname: null }
  if (!nickname) {
    JSONResponse.Send(res, 404, 'Illegal parameters')
    return
  }

  let user = null

  try {
    user = await ProfileModel.find({ nickname })
  } catch (error) {
    console.log(error)
    JSONResponse.Send(res, 500, null)
    return
  }

  JSONResponse.Send(res, 200, { ...user })
}

export async function GetPrivate (req, res) {
  let { login } = req.user ? req.user : { login: null }

  if (!login) {
    JSONResponse.Send(res, 404, 'Illegal parameters')
    return
  }

  login = login.toLowerCase()
  let user = null

  try {
    user = await ProfileModel.find({ login }).limit(1)
  } catch (error) {
    console.log(error)
    JSONResponse.Send(res, 500, null)
    return
  }

  JSONResponse.Send(res, 200, { user: user[0] })
}

export async function Update (req, res) {
  
}

export async function Create (req, res) {
  let { nickname, login } = req.body ? req.body : { nickname: null, login: null }

  if (!nickname || !login) {
    JSONResponse.Send(res, 404, 'Illegal parameters')
    return
  }

  nickname = nickname.toLowerCase()
  login = login.toLowerCase()
  let profile = null

  try {
    profile = await ProfileModel.find({ nickname }).limit(1)
  } catch (error) {
    logger.withFields({ error }).debug(`Search profile: ${nickname}`)
    JSONResponse.Send(res, 500, null)
    return
  }

  if (profile[0]) {
    logger.debug(`Profile already exist: ${nickname}`)
    JSONResponse.Send(res, 404, 'Profile already exist')
    return
  }

  let user = null

  try {
    user = await ProfileModel.find({ login }).limit(1)
  } catch (error) {
    logger.withFields({ error }).debug(`Search user: ${nickname}`)
    JSONResponse.Send(res, 500, null)
    return
  }

  if (!user) {
    try {
      user.nickname = nickname
      await user.save()
    } catch (error) {
      logger.withFields({ error }).debug(`Unable to update profile: ${nickname}`)
      JSONResponse.Send(res, 500, 'Unable to update profile')
      return
    }
  } else {
    try {
      const profile = await ProfileModel.create({ login, nickname })
      await profile.save()
    } catch (error) {
      logger.withFields({ error }).debug(`Unable to create profile: ${nickname}`)
      JSONResponse.Send(res, 500, 'Unable to create profile')
      return
    }
  }

  JSONResponse.Send(res, 200, { nickname })
}
