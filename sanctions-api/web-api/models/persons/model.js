import mongoose from 'mongoose'
import personsSchema from './schema.js'

const PersonsModel = mongoose.model('persons', personsSchema)
export default PersonsModel
