import mongoose from 'mongoose'
import associationsSchema from './schema.js'

const AssociationsModel = mongoose.model('associations', associationsSchema)
export default AssociationsModel
