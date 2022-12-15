import mongoose from 'mongoose'

const organizationsSchema = new mongoose.Schema({
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
  tag: {
    type: [String],
    required: true
  },
  rating: {
    type: Number,
    required: true,
    max: 5,
    min: 1
  },
  foto: {
    type: String,
    required: true,
    maxlength: 100
  }
})

export default organizationsSchema
