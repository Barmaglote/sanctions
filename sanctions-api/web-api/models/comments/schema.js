import mongoose from 'mongoose'

export const commentsSchema = new mongoose.Schema({
  reputationObjectId: {
    type: String,
    required: true,
    lowercase: true    
  },  
  parentId: {
    type: String,
    lowercase: true
  },
  authorId: {
    type: String,
    required: true
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