import dotenv from 'dotenv';
import express from 'express';
dotenv.config();
const app = express();

import routesAPIUsers from './routes/api/users.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

app.use(express.json())
app.use('/api/users', routesAPIUsers);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.PORT);