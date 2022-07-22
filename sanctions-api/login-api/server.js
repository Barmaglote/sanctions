import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

import { getDB } from './models/db.js';
var mongodb = getDB(process.env.MONGO_URI);

import { getRoutesAPIUsers } from './routes/api/users.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

app.use(express.json());
app.use('/api/auth', getRoutesAPIUsers(mongodb));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.PORT);