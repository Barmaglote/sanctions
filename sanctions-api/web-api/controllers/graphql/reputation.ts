import PersonModel from '../../models/persons/model.js'
import CommentsModel from '../../models/comments/model.js'

export async function GetReputationObject(parent) {
  if (!parent || !parent?.reputationObjectId) {
    return null;
  }

  let reputationObject = null;

  console.log("GetReputationObject");
  
  if (parent.reputationObjectType === 'per') {
    console.log("per", parent.reputationObjectId)
    reputationObject = await PersonModel.findOne({ _id: parent.reputationObjectId })
  }

  if (parent.reputationObjectType === 'com') {
    console.log("com", parent.reputationObjectId)
    reputationObject = await CommentsModel.findOne({ _id: parent.reputationObjectId })
  }
    
  return reputationObject
}
