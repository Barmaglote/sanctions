require('dotenv').config()
const express = require('express')
const cors = require('cors')
const corsOptionsDelegate = require('./helpers/cors')
const app = express()
const routesAPIPersons = require('./routes/api/persons')
const routesAPILinks = require('./routes/api/links')
const routesAPIOrganizations = require('./routes/api/organizations')
const routesAPITags = require('./routes/api/tags')
const routesAPIProfiles = require('./routes/api/profiles')
const { graphqlHTTP } = require('express-graphql')
const LinksGQLSchema = require('./models/graphql/schemas/links')

const logger = require('./helpers/logger.js')
logger.info(`Starting WebAPI Server, port: ${process.env.PORT}`)

const connectDB = require('./models/db.js')
connectDB(process.env.MONGO_URI)

app.use(express.json())

app.use('/graphql/v1', graphqlHTTP({
  schema: LinksGQLSchema,
  graphiql: true
}))

app.use('/static', express.static('public'))
app.use(cors(corsOptionsDelegate))
app.use('/api/v1/persons', routesAPIPersons)
app.use('/api/v1/links', routesAPILinks)
app.use('/api/v1/organizations', routesAPIOrganizations)
app.use('/api/v1/tags', routesAPITags)
app.use('/api/v1/profiles', routesAPIProfiles)
app.listen(process.env.PORT, () => {
  logger.info(`WebAPI Server is started, port: ${process.env.PORT}`)
})
