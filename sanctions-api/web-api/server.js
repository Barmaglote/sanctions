require('dotenv').config();
var express = require('express');
var cors = require('cors');
var corsOptionsDelegate = require('./helpers/cors');
const app = express();
const routesAPIPersons = require('./routes/api/persons');
const routesAPILinks = require('./routes/api/links');

app.use(express.json());
app.use(cors(corsOptionsDelegate));
app.use('/api/persons', routesAPIPersons);
app.use('/api/links', routesAPILinks);
app.listen(process.env.PORT);