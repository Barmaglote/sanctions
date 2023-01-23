import logger from './../helpers/logger.js'
import mongoose from 'mongoose'

mongoose.connection.on('connected', () => {
  logger.info('Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (error) => {
  logger.error('Mongoose connected error ' + error)
})

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose disconnected')
})

export function connectDB (url) {
  try {
    logger.info('Connecting to DB')
    mongoose.set('strictQuery', false)
    mongoose.connect(url)
  } catch (error) {
    logger.error('Unable to connect ' + error)
  }
}
