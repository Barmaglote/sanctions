import dotenv from 'dotenv'
import cors from 'cors'
import corsOptionsDelegate from './helpers/cors.js'
import express from 'express'
import logger from './helpers/logger.js'
import { connectDB } from './models/db.js'
import { getRoutesAPIUsers } from './routes/api/users.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.js'

dotenv.config('')
const app = express()

logger.info('Starting LoginAPI Server')
connectDB(process.env.MONGO_URI)

app.use(cors(corsOptionsDelegate))
app.use(express.json())
app.use('/api/auth', getRoutesAPIUsers())
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.listen(process.env.PORT)
