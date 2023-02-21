import mongoose from 'mongoose'

export const likesSchema = new mongoose.Schema({
  reputationObjectId: {
    type: String,
    required: true,
    lowercase: true
  },
  authorId: {
    type: String,
    required: true
  },
  isPositive: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    required: false
  },
  reputationObjectType: {
    type: String,
    enum: [
      'org',
      'per',
      'com',
      'pos'
    ]
  }  
});