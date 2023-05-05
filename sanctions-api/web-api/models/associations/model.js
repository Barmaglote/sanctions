import mongoose from 'mongoose'
import associationsSchema from './schema.js'

const AssociationsModel = mongoose.model('persons', associationsSchema)
export default AssociationsModel
