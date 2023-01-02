import mongoose from 'mongoose'

export const commentsSchema = new mongoose.Schema({
  reputation_object_id: {
    type: String,
    required: true,
    lowercase: true    
  },  
  parrent_id: {
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
});