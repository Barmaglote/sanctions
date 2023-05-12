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
  isApproved: {
    type: Boolean,
    required: true
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
    maxlength: 10,
    validate: {
      validator: v => ['per','org'].indexOf(v) > 0,
      message: props => `${props.value} is not correct url`
    }
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

