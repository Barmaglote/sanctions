require('dotenv').config();
var express = require('express');
var cors = require('cors');
var corsOptionsDelegate = require('./helpers/cors');
const app = express();
const routesAPIPersons = require('./routes/api/persons');
const routesAPILinks = require('./routes/api/links');
const routesAPIOrganizations = require('./routes/api/organizations');
const routesAPITags = require('./routes/api/tags');

let connectDB = require('./models/db.js');
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use('/api/persons', routesAPIPersons);
app.use('/api/links', routesAPILinks);
app.use('/api/organizations', routesAPIOrganizations);
app.use('/api/tags', routesAPITags);
app.listen(process.env.PORT);