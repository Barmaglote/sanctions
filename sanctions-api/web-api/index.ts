import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import logger from './helpers/logger.js'
import { connectDB } from './models/db.js'
import { Links } from './controllers/graphql/links.js'
import { Tags, ComputeTags } from './controllers/graphql/tags.js'
import { Persons, PersonsTotal } from './controllers/graphql/persons.js'
import { Organizations, OrganizationsTotal } from './controllers/graphql/organizations.js'
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';

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
    organizationsTotal(lazyLoadEvent: LazyLoadEvent): Int        
  }
`;

const resolvers = {
    Query: {
      links: (_, { type }) => Links(type),
      tags: (_, { area }) => Tags(area),
      persons: (_, { lazyLoadEvent }) => Persons(lazyLoadEvent),
      personsTotal: (_, { lazyLoadEvent }) => PersonsTotal(lazyLoadEvent),
      organizations: (_, { lazyLoadEvent }) => Organizations(lazyLoadEvent),
      organizationsTotal: (_, { lazyLoadEvent }) => OrganizationsTotal(lazyLoadEvent),      
    },
    Person: {
      tags: ComputeTags
    },
    Organization: {
      tags: ComputeTags
    }
  };

const server = new ApolloServer({
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
  });
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 5005 },
  });
  
  console.log(`🚀 Server ready at: ${url}`);