require('dotenv').config();
var express = require('express');
var cors = require('cors');
var corsOptionsDelegate = require('./helpers/cors');
const app = express();
const routesAPIPersons = require('./routes/api/persons');
const routesAPILinks = require('./routes/api/links');
const routesAPIOrganizations = require('./routes/api/organizations');
const routesAPITags = require('./routes/api/tags');
var log4js = require('log4js'); 

log4js.configure({ // configure to use all types in different files.
    appenders: { 
        api: { type: "file", filename: "./logs/api.log", maxLogSize: 20480, backups: 10 },
    },
    categories: { 
        default: { appenders: ["api"], level: "all" }
    }
});

var loggerapi = log4js.getLogger('api');

let connectDB = require('./models/db.js');
connectDB(process.env.MONGO_URI);

loggerapi.info("Starting WebAPI Server");
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
app.use(express.json());
app.use('/static', express.static('public'))
app.use(cors(corsOptionsDelegate));
app.use('/api/v1/persons', routesAPIPersons);
app.use('/api/v1/links', routesAPILinks);
app.use('/api/v1/organizations', routesAPIOrganizations);
app.use('/api/v1/tags', routesAPITags);
app.listen(process.env.PORT);