import PersonModel from '../../models/persons/model.js'
import CommentsModel from '../../models/comments/model.js'

export async function GetReputationObject(parent) {
  if (!parent || !parent?.reputationObjectId) {
    return null;
  }

  let reputationObject = null;
  
  if (parent.reputationObjectType === 'per') {
    reputationObject = await PersonModel.findOne({ _id: parent.reputationObjectId })
  }

  if (parent.reputationObjectType === 'com') {
    reputationObject = await CommentsModel.findOne({ _id: parent.reputationObjectId })
  }
    
  return reputationObject
}
