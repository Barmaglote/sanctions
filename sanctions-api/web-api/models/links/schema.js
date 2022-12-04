const mongoose = require('mongoose')
const LINK = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig

const linksSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    lowercase: true
  },
  titlerus: {
    type: String,
    required: true,
    maxlength: 100
  },
  titleeng: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 10000
  },
  link: {
    type: String,
    required: true,
    maxlength: 100,
    validate: {
      validator: v => LINK.test(v),
      message: props => `${props.value} is not correct url`
    }
  },
  foto: {
    type: String,
    required: true,
    maxlength: 100
  }
})

module.exports = linksSchema
