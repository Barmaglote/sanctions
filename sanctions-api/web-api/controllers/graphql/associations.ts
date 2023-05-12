import dotenv from 'dotenv'
dotenv.config()
import { GraphQLError } from 'graphql'
import AssociationsModel from '../../models/associations/model.js'
import { AssociationRequest } from '../../models/associations/AssociationRequest'
import { createLogger } from '../../helpers/logger.js'

const logger = createLogger(process.env.SEQ_LOG_ADDR, process.env.SEQ_LOG_KEY);

const EMPTY_ASSOCIATION = {
  reputationObjectId: "unknown",
  reputationObjectType: "unknown",
  owner: {},
  assistants: [],
  isConfirmed: false
}

export async function AddAssociation(request: AssociationRequest, userId: String) {

  console.log("Was ist das?")

  if (!request || !userId) {
    return EMPTY_ASSOCIATION
  }

  var type = getShortObjectType(request.type);
  if (['per', 'org'].indexOf(type) < 0) { return EMPTY_ASSOCIATION }

  userId = userId.trim()

  if (!request.confirmed) { throw new GraphQLError('Request is not confirmed') }

  let association = await AssociationsModel.findOne({ reputationObjectId: request.reputationObject._id })

  if (association && association.reputationObjectId === request.reputationObject._id) {
    // Association exists already, no need to create new
    return association
  }

  console.log("Save 01", request.reputationObject)

  try {
    let createdAt = new Date()
    association = await AssociationsModel.create({
      reputationObjectId: request.reputationObject._id,
      reputationObjectType: type,
      owner: {
        userId: userId,
        createdAt: createdAt.toISOString(),
        isApproved: false
      }
    })

    console.log("Save 02", association)

    await association.save()
  } catch (error) {
    logger.error("Ma che tu fai?")
    logger.error("FGDE?", error)
    throw new GraphQLError('Unable to create association')
  }

  return association || EMPTY_ASSOCIATION
}

export async function GetAssociation(parent) {
  let associations = await AssociationsModel.find({ "owner.userId": parent.userId })  
  if (associations) { return [...associations]; }

  return []
}

function getShortObjectType(type: string) {
  if (!type) { return null; }
  if (type.toLocaleLowerCase().startsWith('person')) { return 'per';}
  if (type.toLocaleLowerCase().startsWith('organization')) { return 'org';}
  return type.slice(0,2);
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