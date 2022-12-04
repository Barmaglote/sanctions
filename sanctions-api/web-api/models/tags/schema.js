const mongoose = require('mongoose')

const subTagsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true,
    maxlength: 100
  },
  data: {
    type: String,
    required: true,
    maxlength: 1000
  },
  icon: {
    type: String,
    required: true,
    maxlength: 100
  },
  area: {
    type: String,
    required: true,
    maxlength: 20
  }
})

const tagsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true,
    maxlength: 100
  },
  data: {
    type: String,
    required: true,
    maxlength: 1000
  },
  icon: {
    type: String,
    required: true,
    maxlength: 100
  },
  children: {
    type: [subTagsSchema]
  },
  area: {
    type: String,
    required: true,
    maxlength: 20
  }
})

module.exports = tagsSchema
