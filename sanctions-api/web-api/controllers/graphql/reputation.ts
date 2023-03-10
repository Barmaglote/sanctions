import PersonModel from '../../models/persons/model.js'
import CommentsModel from '../../models/comments/model.js'
import OrganizationsModel from '../../models/organizations/model.js'

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

export async function GetReputationObjectForSubscribtion(parent) {

  if (!parent || !parent?.objectId) {
    return null;
  }

  let reputationObject = null;
  
  if (parent.objectType === 'per') {
    reputationObject = await PersonModel.findOne({ _id: parent.objectId })
  }

  if (parent.objectType === 'org') {
    reputationObject = await OrganizationsModel.findOne({ _id: parent.objectId })
  }
    
  return reputationObject
}
