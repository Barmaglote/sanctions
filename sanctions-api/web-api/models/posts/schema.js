import mongoose from 'mongoose'

export const postsSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true,
    maxlength: 10000
  },
  preview: {
    type: String,
    required: true,
    maxlength: 1000
  },
  title: {
    type: String,
    required: true,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    required: false
  },
  tags: {
    type: [String],
    validator: (tag) => tag && tag.length >= 2 && tag.length <= 15,
    maxlength: 5
  },  
});