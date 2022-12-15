import mongoose from 'mongoose'

const EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
const NICKNAME = /^[a-z]{3,25}$/i
const INFO = /^[\w\s\d]{0,250}$/i

const profileSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    lowercase: true,
    minlength: 5,
    validate: {
      validator: v => EMAIL.test(v),
      message: props => `${props.value} is not correct email`
    }
  },
  nickname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    validate: {
      validator: v => NICKNAME.test(v),
      message: props => `${props.value} is not correct nickname`
    }
  },
  info: {
    type: String,
    required: false,
    maxlength: 250,
    validate: {
      validator: v => INFO.test(v),
      message: props => `${props.value} is not correct info`
    }
  }
})

export default profileSchema
