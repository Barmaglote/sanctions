import dotenv from 'dotenv'
import cors from 'cors'
import corsOptionsDelegate from './helpers/cors.js'
import express from 'express'
import logger from './helpers/logger.js'
import { connectDB } from './models/db.js'

import { getRoutesAPIProfiles } from  './routes/api/profiles.js'

dotenv.config('')
logger.info(`Starting WebAPI Server, port: ${process.env.PORT}`)

const app = express()
connectDB(process.env.MONGO_URI)

app.use(express.json())
app.use(cors(corsOptionsDelegate))
app.use('/static', express.static('public'))
app.use('/api/v1/profiles', getRoutesAPIProfiles())
app.listen(process.env.PORT, () => {
  logger.info(`🚀 WebAPI Server is started, port: ${process.env.PORT}`)
})
