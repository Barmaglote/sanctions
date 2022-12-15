import mongoose from 'mongoose'
import OrganizationsSchema from './schema.js'

const OrganizationsModel = mongoose.model('organizations', OrganizationsSchema)
export default OrganizationsModel
