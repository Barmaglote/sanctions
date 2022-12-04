const mongoose = require('mongoose')

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB')
})

mongoose.connection.on('error', (error) => {
  console.log('Mongoose connected error ' + error)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected')
})

function connectDB (url) {
  try {
    console.log('Connecting to DB')
    mongoose.connect(url)
  } catch (error) {
    console.log('Unable to connect')
    console.log(error)
  }
}

module.exports = connectDB
