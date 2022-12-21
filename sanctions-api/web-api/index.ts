import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import logger from './helpers/logger.js'
import { connectDB } from './models/db.js'
import { GetLinks } from './controllers/graphql/links.js'
import { GetTags, ComputeTags } from './controllers/graphql/tags.js'
import { GetPersons, GetPersonsTotal } from './controllers/graphql/persons.js'
import { GetOrganizations, GetOrganizationsTotal } from './controllers/graphql/organizations.js'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import express from 'express'
import corsOptionsDelegate from './helpers/cors.js'
import { getRoutesAPIPersons } from './routes/api/persons.js'
import { getRoutesAPIOrganizations } from './routes/api/organizations.js'
import { getRoutesAPITags } from './routes/api/tags.js'
import { getRoutesAPIProfiles } from  './routes/api/profiles.js'
import { ApolloContext } from './models/apollo-context'; 
import { GetContext } from './helpers/context.js';
import { GetProfile, AddProfile } from './controllers/graphql/profiles.js';

dotenv.config()
logger.info(`Starting WebAPI Server, port: ${process.env.PORT}`)

connectDB(process.env.MONGO_URI)

const schema = loadSchemaSync('./models/schema.graphql', { loaders: [new GraphQLFileLoader()] })
const queriesDefs = `#graphql
  type Query {
    links(type: String): [Link]
    tags(area: String): [Tag]
    persons(lazyLoadEvent: LazyLoadEvent): [Person]  
    personsTotal(lazyLoadEvent: LazyLoadEvent): Int  
    organizations(lazyLoadEvent: LazyLoadEvent): [Organization]  
    organizationsTotal(lazyLoadEvent: LazyLoadEvent): Int,
    profile(nickname: String): Profile        
  }
  type Mutation {
    addProfile(nickname: String): Profile
  }
`;

const resolvers = {
    Query: {
      links: (_, { type }) => GetLinks(type),
      tags: (_, { area }) => GetTags(area),
      persons: (_, { lazyLoadEvent }) => GetPersons(lazyLoadEvent),
      personsTotal: (_, { lazyLoadEvent }) => GetPersonsTotal(lazyLoadEvent),
      organizations: (_, { lazyLoadEvent }) => GetOrganizations(lazyLoadEvent),
      organizationsTotal: (_, { lazyLoadEvent }) => GetOrganizationsTotal(lazyLoadEvent),      
      profile: (_, { nickname }, { user } ) => GetProfile(nickname, user?.login)
    },
    Mutation: {
      addProfile: (_, { nickname }, { user }) => AddProfile(nickname, user?.login)
    },
    Person: {
      tags: ComputeTags
    },
    Organization: {
      tags: ComputeTags
    }
  };

const app = express();

const server = new ApolloServer<ApolloContext>({
    typeDefs: [schema, queriesDefs],
    resolvers,
    plugins: [
      process.env.PRODUCTION === 'true'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    cache: new InMemoryLRUCache({
      maxSize: Math.pow(2, 20) * 100, // ~100MiB
      ttl: 300_000, // 5 minutes (in milliseconds)
    }),
    logger: logger
});
  
await server.start();


app.use(express.json())
app.use(cors(corsOptionsDelegate))
app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, {
  context: GetContext
}));
app.use('/static', express.static('public'))
app.use('/api/v1/persons', getRoutesAPIPersons())
app.use('/api/v1/organizations', getRoutesAPIOrganizations())
app.use('/api/v1/tags', getRoutesAPITags())
app.use('/api/v1/profiles', getRoutesAPIProfiles())
app.listen(process.env.PORT, () => {
  logger.info(`🚀 WebAPI Server is started, port: ${process.env.PORT}`)
})