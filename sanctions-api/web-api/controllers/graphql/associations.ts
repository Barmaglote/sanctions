import { GraphQLError } from 'graphql'
import AssociationsModel from '../../models/associations/model.js'

const EMPTY_ASSOCIATION = {
  reputationObjectId: null,
  mainUser: null,
  assistants: []
}

export async function AddAssociation(reputationObjectId: String, userId: String) {
  if (!reputationObjectId || !userId) {
    return EMPTY_ASSOCIATION
  }

  userId = userId.trim()
  reputationObjectId = reputationObjectId.trim()

  let association = await AssociationsModel.findOne({ reputationObjectId })
  if (association && association.reputationObjectId === reputationObjectId) {
    return association
  }
  
  try {
    let createdAt = new Date()
    association = await AssociationsModel.create({ 
      reputationObjectId, 
      owner: { 
        userId: userId,
        createdAt: createdAt.toISOString()
      } 
    })
    await association.save()
  } catch (error) {  
    throw new GraphQLError('Unable to create association')
  }

  return association || EMPTY_ASSOCIATION
}

/*
// Start a new session
const session = await mongoose.startSession();
session.startTransaction();

try {
  // Update the AssociationModel
  const association = await AssociationsModel.findOneAndUpdate(
    { name: 'myAssociation' },
    { $set: { fieldToUpdate: 'newValue' } },
    { new: true, session }
  ).exec();

  // Update the PersonsModel
  const person = await PersonsModel.findOneAndUpdate(
    { name: 'myPerson' },
    { $set: { fieldToUpdate: 'newValue' } },
    { new: true, session }
  ).exec();

  // If both updates succeed, commit the transaction
  await session.commitTransaction();
} catch (error) {
  // If any updates fail, abort the transaction
  await session.abortTransaction();
  console.error(error);
} finally {
  // End the session
  session.endSession();
}
*/