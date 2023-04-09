import mongoose from 'mongoose'
const LINK = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)/i

export const linkSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    lowercase: true,
    enum : [
      'wk',   // Wikipedia     
      'fb',   // Facebook
      'tw',   // Twitter
      'in',   // Instagram
      'tg',   // Telegram channel
      'yt'    // Youtube
    ]   
  },
  url: {
    type: String,
    required: true,
    maxlength: 150,
    validate: {
      validator: v => LINK.test(v),
      message: props => `${props.value} is not correct url`
    }
  }
});