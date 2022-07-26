import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express from 'express';
const app = express();

import { getDB } from './models/db.js';
var mongodb = getDB(process.env.MONGO_URI);

import { getRoutesAPIUsers } from './routes/api/users.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.js';

var whitelist = ['http://localhost:3000', 'http://localhost:4000'];

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    }else{
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use('/api/auth', getRoutesAPIUsers(mongodb));
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(process.env.PORT);