import mongoose from 'mongoose'
import { linkSchema } from '../link/schema'

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
  links: {
    type: [linkSchema],
    required: false,
    maxlength: 5
  },  
  viewed: {
    type: Number,
    required: true,
    default: 0
  },
  foto: {
    type: String,
    required: false,
    maxlength: 100
  }
})

export default organizationsSchema
