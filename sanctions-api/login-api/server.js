import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import corsOptionsDelegate from './helpers/cors.js';
import express from 'express';
const app = express();
import  log4js from 'log4js'; 

log4js.configure({ // configure to use all types in different files.
    appenders: { 
        login: { type: "file", filename: "./logs/login.log", maxLogSize: 20480, backups: 10 },
    },
    categories: { 
        default: { appenders: ["login"], level: "all" }
    }
});


var loggerlogin = log4js.getLogger('login');

loggerlogin.info("Starting LoginAPI Server");
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

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