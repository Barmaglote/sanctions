import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express from 'express'
import corsOptionsDelegate from './helpers/cors.js'
import { createLogger } from './helpers/logger.js'
import { ApolloServer } from '@apollo/server';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { connectDB } from './models/db.js'
import { GetLinks } from './controllers/graphql/links.js'
import { GetTags, ComputeTags } from './controllers/graphql/tags.js'
import { GetPerson, GetPersons, GetPersonsTotal } from './controllers/graphql/persons.js'
import { GetOrganizations, GetOrganizationsTotal } from './controllers/graphql/organizations.js'
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloContext } from './models/apollo-context'
import { GetContext } from './helpers/context.js'
import { GetProfile, AddProfile, UpdateProfile } from './controllers/graphql/profiles.js'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GetComments, AddComment, GetCommentsTotal, ComputeComments, ComputeAuthor } from './controllers/graphql/comments.js'
import { dateTimeScalar } from './models/datetimescalar.js';
import { AddLike, GetDislikesByReputationObjectId, GetLike, GetLikesByReputationObjectId } from './controllers/graphql/likes.js'

const logger = createLogger(process.env.SEQ_LOG_ADDR, process.env.SEQ_LOG_KEY);

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
    profile(nickname: String): Profile        
    person(_id: String!): Person
    comments(reputationObjectId: String!, lazyLoadEvent: LazyLoadEvent): [Comment],
    commentsTotal(reputationObjectId: String!): Int,
    like(reputationObjectId: String!): Like,
    likes(reputationObjectId: String!): Int,
    dislikes(reputationObjectId: String!): Int
  }
  type Mutation {
    addProfile(nickname: String): Profile
    updateProfile(profile: ProfileInput): Profile
    addComment(commentInput: CommentInput!): Comment
    addLike(likeInput: LikeInput!): Like
  }
`;

const resolvers = {
    DateTime: dateTimeScalar,
    Query: {
      links: (_, { type }) => GetLinks(type),      
      tags: (_, { area }) => GetTags(area),
      persons: (_, { lazyLoadEvent }) => GetPersons(lazyLoadEvent),
      personsTotal: (_, { lazyLoadEvent }) => GetPersonsTotal(lazyLoadEvent),
      organizations: (_, { lazyLoadEvent }) => GetOrganizations(lazyLoadEvent),
      organizationsTotal: (_, { lazyLoadEvent }) => GetOrganizationsTotal(lazyLoadEvent),      
      profile: (_, { nickname }, { user } ) => GetProfile(nickname, user?.id),
      person: (_, { _id } ) => GetPerson(_id),
      comments: (_, { reputationObjectId, lazyLoadEvent } ) => GetComments(reputationObjectId, lazyLoadEvent),
      commentsTotal: (_, { reputationObjectId } ) => GetCommentsTotal(reputationObjectId),
      like: (_, { reputationObjectId }, { user } ) => GetLike(reputationObjectId, user?.id),
      likes: (_, { reputationObjectId } ) => GetLikesByReputationObjectId(reputationObjectId),
      dislikes: (_, { reputationObjectId } ) => GetDislikesByReputationObjectId(reputationObjectId)
    },
    Mutation: {
      addProfile: (_, { nickname }, { user }) => AddProfile(nickname, user?.id),
      updateProfile: (_, { profile }, { user }) => UpdateProfile(profile, user?.id),
      addComment: (_, { commentInput }, { user }) => AddComment(commentInput.reputationObjectId, commentInput.parentId, commentInput.comment, user?.id),
      addLike: (_, { likeInput }, { user }) => AddLike(likeInput.reputationObjectId, likeInput.isPositive, user?.id)
    },
    Person: {
      tags: ComputeTags
    },
    Organization: {
      tags: ComputeTags
    },
    Comment: {
      comments: ComputeComments,
      author: ComputeAuthor
    }
  };

const app = express();

const server = new ApolloServer<ApolloContext>({
    typeDefs: [schema, queriesDefs],
    resolvers,
    formatError: (formattedError, error) => {
      logger.error(error)
      if ( formattedError.extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED ) {
        return {
          ...formattedError,
          message: "Your query doesn't match the schema. Try double-checking it!",
        };
      }   

      return formattedError
    },
    plugins: [
      process.env.PRODUCTION === 'true'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ embed: true })       
    ],
    cache: new InMemoryLRUCache({
      maxSize: Math.pow(2, 20) * 100, // ~100MiB
      ttl: 300_000, // 5 minutes (in milliseconds)
    }),
});
  
await server.start();

app.use(express.json())
app.use(cors(corsOptionsDelegate))
app.use('/graphql', cors<cors.CorsRequest>(process.env.CORS_DOMAINS), express.json(), expressMiddleware(server, { context: GetContext }))
app.use('/static', express.static('public'))
app.listen(process.env.PORT, () => {
  logger.info(`🚀 WebAPI Server is started, port: ${process.env.PORT}`)
})