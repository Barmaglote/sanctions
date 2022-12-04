import { Send } from './../helpers/response.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './../models/users/model.js'
import crypto from 'node:crypto'
import { ChangePasswordTokenRepository } from '../repository/redis/ChangePasswordTokenRepository.js'
import request from 'request'
import logger from '../helpers/logger.js'

const CHANGE_PASSWORD_TOKEN_TTL = 10 * 60 * 1000 // 10 min // TODO: move to .env

export async function Register (req, res) {
  const { username, password } = req.body
  let { login } = req.body

  if (!login || !password || !username || username === password) {
    Send(res, 500, { status: 'failed' })
    return
  }

  login = ToLowerAndTrim(login)
  const isExist = await User.exists({ login })

  if (isExist) {
    Send(res, 500, { status: 'failed', message: `User ${login} already exists` })
    return
  }

  try {
    const salt = await bcrypt.genSalt()
    const newpassword = await bcrypt.hash(password, salt)
    const user = await User.create({ login, username, newpassword })
    await user.save()
    CreateChangePasswordToken(username, login, SendConfirmation)
    Send(res, 200, { status: 'success', login, username })
  } catch (err) {
    logger.error(err)
    Send(res, 500, { status: 'failed' })
  }
};

export async function ConfirmPasswordChange (req, res) {
  const { token } = req.body
  let { login } = req.body

  if (!token) {
    Send(res, 500, { status: 'failed' })
    return
  }

  const changetoken = await ChangePasswordTokenRepository.search().where('token').is.equalTo(token).return.first()

  login = ToLowerAndTrim(login)

  if (!changetoken || changetoken.login !== login) {
    Send(res, 500, { status: 'failed' })
    return
  }

  const user = await User.findOne({ login }).exec()

  if (!user) {
    Send(res, 500, { status: 'failed', message: 'User does not exist' })
    return
  }

  try {
    user.password = user.newpassword
    user.newpassword = null
    user.save()

    CreateChangePasswordToken(user.username, login, SendPasswordChangedNotification)
    Send(res, 200, { status: 'success' })
  } catch {
    Send(res, 500, { status: 'failed' })
  }
};

export async function RestorePassword (req, res) {
  const { password, token } = req.body
  let { login } = req.body

  if (!password || !token || !login) {
    Send(res, 500, { status: 'failed', message: 'Bad request' })
    return
  }

  const changetoken = await ChangePasswordTokenRepository.search().where('token').is.equalTo(token).return.first()

  login = ToLowerAndTrim(login)
  if (!changetoken || changetoken.login !== login) {
    // TODO: Make too many attemps control
    Send(res, 500, { status: 'failed', message: 'Token is expired' })
    return
  }

  const user = await User.findOne({ login }).exec()

  if (!user) {
    Send(res, 500, { status: 'failed', message: 'User is missing' })
    return
  }

  try {
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    user.newpassword = hashPassword
    user.save()

    CreateChangePasswordToken(user.username, login, SendConfirmation)
    Send(res, 200, { status: 'success' })
  } catch {
    Send(res, 500, { status: 'failed' })
  }
};

export async function ChangePassword (req, res) {
  const { oldpassword, password } = req.body
  let { login } = req.body

  if (!login || !password || !oldpassword) {
    Send(res, 500, { status: 'failed' })
    return
  }

  if (password === oldpassword) {
    Send(res, 500, { status: 'New password repeats old one' })
    return
  }

  login = ToLowerAndTrim(login)
  const user = await User.findOne({ login, password: { $ne: null } }).exec()

  if (!user) {
    Send(res, 500, { status: 'failed' })
    return
  }

  try {
    const isPasswordEqual = await bcrypt.compare(oldpassword, user.password)

    if (!isPasswordEqual) {
      Send(res, 500, { status: 'failed' })
      return
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    user.newpassword = hashPassword
    user.save()
    CreateChangePasswordToken(user.username, login, SendConfirmation)

    Send(res, 200, { status: 'success' })
  } catch {
    Send(res, 500, { status: 'failed' })
  }
};

export async function RequestRestorePassword (req, res) {
  let { login } = req.body

  if (!login) {
    Send(res, 500, { status: 'failed', message: 'Login is not set' })
    return
  }

  login = ToLowerAndTrim(login)
  const user = await User.findOne({ login }).exec()

  if (!user) {
    Send(res, 500, { status: 'failed', message: 'User is not found' })
    return
  }

  try {
    CreateChangePasswordToken(user.username, login, SendChangePasswordRequest)
    Send(res, 200, { status: 'success' })
  } catch {
    Send(res, 500, { status: 'failed' })
  }
};

export async function Logout (req, res) {
  Send(res, 200, { status: 'success', accessToken: null, refreshToken: null, user: null })
}

export async function Login (req, res) {
  const { password } = req.body
  let { login } = req.body

  if (!login || !password) {
    Send(res, 500, { status: 'failed', message: 'Password or Login are missing' })
    return
  }

  login = ToLowerAndTrim(login)
  const user = await User.findOne({ login, password: { $ne: null } }).exec()

  if (!user || !user.password) {
    Send(res, 500, { status: 'failed', message: 'User is missing or password is not confirmed' })
    return
  }

  try {
    const isPasswordEqual = await bcrypt.compare(password, user.password)

    if (!isPasswordEqual) {
      Send(res, 500, { status: 'failed', message: 'Wrong credentials' })
      return
    }

    const payload = { login: user.login, username: user.username }
    const accessToken = GenerateAccessToken(payload)
    const refreshToken = GenerateRefreshToken(payload)

    Send(res, 200, { status: 'success', accessToken, refreshToken, user: { login: user.login, username: user.username } })
  } catch (e) {
    console.log(e)
    Send(res, 500, { status: 'failed' })
  }
};

export async function RefreshAccessToken (req, res) {
  const refreshToken = req.body.refreshToken
  if (!refreshToken) {
    Send(res, 401, { status: 'failed' })
    return
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      Send(res, 403, { status: 'failed' })
      return
    }

    const accessToken = GenerateAccessToken({ login: user.login, username: user.username })
    Send(res, 200, { status: 'success', accessToken })
  })
};

export async function CurrentUser (req, res) {
  if (!req.user) {
    Send(res, 401, { status: 'failed' })
    return
  }

  Send(res, 200, { status: 'success', user: req.user })
};

const ToLowerAndTrim = (item) => {
  if (!item) return
  return item.toLowerCase().trim()
}

const CreateChangePasswordToken = (username, login, callback) => {
  DeleteChangePasswordTokensByLogin(login)
  const token = crypto.randomBytes(128).toString('hex')
  ChangePasswordTokenRepository.createAndSave({ token, login }).then((item) => {
    if (!item) return
    ChangePasswordTokenRepository.expire(token.entityId, CHANGE_PASSWORD_TOKEN_TTL)
    callback(username, login, token)
  })
}

const DeleteChangePasswordTokensByLogin = (login) => {
  ChangePasswordTokenRepository.search().where('login').is.equalTo(login).return.all().then(item => {
    ChangePasswordTokenRepository.remove(item.entityId)
  })
}

const PostMsg = async (msg) => {
  await request.post(
        `${process.env.MAILSERVER}/send`,
        {
          json: msg,
          headers: {
            APIKEY: process.env.MAIL_API_KEY
          }
        },
        (err, response, body) => {
          logger.error('Unable to send mail: err: ', err)
        }
  )
}

const SendConfirmation = async (username, login, confirmation) => {
  const msg = {
    Category: 'Confirmation',
    Username: username,
    Email: login,
    Confirmation: confirmation
  }

  await PostMsg(msg)
}

const SendPasswordChangedNotification = async (username, login, confirmation) => {
  const msg = {
    Category: 'ConfirmationPasswordChange',
    Username: username,
    Email: login,
    Confirmation: confirmation
  }

  await PostMsg(msg)
}

const SendChangePasswordRequest = async (username, login, confirmation) => {
  const msg = {
    Category: 'ChangePasswordRequest',
    Username: username,
    Email: login,
    Confirmation: confirmation
  }

  await PostMsg(msg)
}

const GenerateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN })
}

const GenerateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN })
}
