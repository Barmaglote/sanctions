import mongoose from 'mongoose'
import profileSchema from './schema.js'

const ProfileModel = mongoose.model('profiles', profileSchema)
export default ProfileModel
