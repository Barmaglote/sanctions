import mongoose from 'mongoose'

const userInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    maxlength: 100
  },
  createdAt: {
    type: Date,
    required: false
  },
})

const associationsSchema = new mongoose.Schema({
  reputationObjectId: {
    type: String,
    required: true,
    maxlength: 100
  },
  reputationObjectType: {
    type: String,
    required: true,
    maxlength: 10
  },  
  owner: {
    type: userInfoSchema,
    required: false
  },
  assistants: {
    type: [userInfoSchema],
    required: false,
    maxlength: 5
  }
})

export default associationsSchema

