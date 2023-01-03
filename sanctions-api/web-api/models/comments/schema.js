import mongoose from 'mongoose'

export const commentsSchema = new mongoose.Schema({
  reputationObjectId: {
    type: String,
    required: true,
    lowercase: true    
  },  
  parrentId: {
    type: String,
    lowercase: true
  },
  login: {
    type: String,
    required: true,
    lowercase: true
  },
  comment: {
    type: String,
    required: true,
    maxlength: 200
  },
  createdAt: {
    type: Date,
    required: false
  },  
});