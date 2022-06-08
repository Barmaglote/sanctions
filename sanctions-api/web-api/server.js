require('dotenv').config();
var express = require('express');
const app = express();
const routesAPIPersons = require('./routes/api/persons');

app.use(express.json())
app.use('/api/persons', routesAPIPersons);
app.listen(process.env.PORT);