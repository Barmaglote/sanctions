import { GraphQLError } from 'graphql'
import AssociationsModel from '../../models/associations/model.js'
import { AssociationRequest } from '../../models/associations/AssociationRequest';

console.log("AddAssociation")

const EMPTY_ASSOCIATION = {
  reputationObjectId: null,
  reputationObjectType: null,
  owner: null,
  assistants: [],
  isConfirmed: false
}

export async function AddAssociation(request: AssociationRequest, userId: String) {
  if (!request || !userId) {
    return EMPTY_ASSOCIATION
  }

  userId = userId.trim()

  if (!request.confirmed) { throw new GraphQLError('Request is not confirmed') }

  let association = await AssociationsModel.findOne({ reputationObjectId: request.reputationObject._id })

  if (association && association.reputationObjectId === request.reputationObject._id) {
    // Association exists already, no need to create new
    return association
  }
  
  try {
    let createdAt = new Date()
    association = await AssociationsModel.create({
      reputationObjectId: request.reputationObject._id,
      reputationObjectType: request.type,
      owner: {
        userId: userId,
        createdAt: createdAt.toISOString(),
        isApproved: false
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