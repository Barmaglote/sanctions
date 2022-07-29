import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import corsOptionsDelegate from './helpers/cors.js';
import express from 'express';
const app = express();

import { connectDB } from './models/db.js';
connectDB(process.env.MONGO_URI);

import { getRoutesAPIUsers } from './routes/api/users.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use('/api/auth', getRoutesAPIUsers());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.PORT);