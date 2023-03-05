import mongoose from 'mongoose'

const NICKNAME = /^[a-z]{1}[a-z\d]{3,25}$/i
const INFO = /^[\w\s\d]{0,250}$/i
const MAX_SUBSCRIBTIONS = 200;

const profileSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    minlength: 5,
    unique: true
  },
  nickname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
    unique: true,
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
  },
  subscribtions: {    
    type: [{
      objectId: String,
      objectType: String
    }],
    required: false,
    maxlength: MAX_SUBSCRIBTIONS,
    validate: {
      validator: v => v.length <= MAX_SUBSCRIBTIONS,
      message: props => `Too many subscribtions`
    }
  }
})

export default profileSchema
