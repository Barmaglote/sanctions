import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import express, { Response, Request } from 'express'
import corsOptionsDelegate from './helpers/cors.js'
import { createLogger } from './helpers/logger.js'
import { ApolloServer } from '@apollo/server';
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { connectDB } from './models/db.js'
import { GetLinks } from './controllers/graphql/links.js'
import { GetTags, ComputeTags } from './controllers/graphql/tags.js'
import { GetPerson, GetPersons, GetPersonsTotal } from './controllers/graphql/persons.js'
import { GetOrganization, GetOrganizations, GetOrganizationsTotal } from './controllers/graphql/organizations.js'
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default'
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloContext } from './models/apollo-context'
import { GetContext } from './helpers/context.js'
import { GetProfile, AddProfile, UpdateProfile, GetProfileForUserInfo } from './controllers/graphql/profiles.js'
import { GetReputationObject, GetReputationObjectForSubscribtion } from './controllers/graphql/reputation.js'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GetComments, AddComment, GetCommentsTotal, ComputeComments, ComputeAuthor, GetCommentsTotalForParent } from './controllers/graphql/comments.js'
import { dateTimeScalar } from './models/datetimescalar.js';
import { AddLike, GetDislikesByReputationObjectId, GetLike, GetLikesByReputationObjectId, GetLikesFeed } from './controllers/graphql/likes.js'
import { UpdateSubscribtion, IsSubscribed, GetSubscribersTotal, GetSubscribtions } from './controllers/graphql/subscribtions.js';
import { AddPost, GetPost, GetPosts, GetPostsTotal, GetPostsTotalForParent } from './controllers/graphql/posts.js';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { restResponseTimeHistogram, startMetricsServer, restRequestsCounter } from './utils/metrics.js';
import responseTime from 'response-time';
import { AddAssociation, GetAssociation } from './controllers/graphql/associations.js'
import api from './controllers/rest/api';

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
    organization(_id: String!): Organization
    organizations(lazyLoadEvent: LazyLoadEvent): [Organization]  
    organizationsTotal(lazyLoadEvent: LazyLoadEvent): Int
    profile(nickname: String): Profile        
    person(_id: String!): Person
    comments(reputationObjectId: String!, lazyLoadEvent: LazyLoadEvent): [Comment]
    commentsTotal(reputationObjectId: String!): Int
    like(reputationObjectId: String!): Like
    likes(reputationObjectId: String!): Int
    dislikes(reputationObjectId: String!): Int
    likesFeed(userId: String!, page: Int): [Like]
    isSubscribed(userId: String!, reputationObjectId: String!): Boolean
    getSubscribersTotal(reputationObjectId: String!): Int
    getSubscribtions(userId: String!): [Subscribtion]
    posts(authorId: String, lazyLoadEvent: LazyLoadEvent): [Post]
    post(_id: String!): Post
    postsTotal(authorId: String, lazyLoadEvent: LazyLoadEvent): Int
  }
  type Mutation {
    addProfile(nickname: String): Profile
    updateProfile(profile: ProfileInput): Profile
    addComment(commentInput: CommentInput!): Comment
    addLike(likeInput: LikeInput!): Like
    updateSubscribtion(subscribtionInput: SubscribtionInput!): Boolean
    addPost(postInput: PostInput!): Post 
    addAssociation(associationRequest: AssociationRequest!): Association
  }
`;

const resolvers = {
    DateTime: dateTimeScalar,
    Query: {
      links: (_, { type }) => GetLinks(type),      
      tags: (_, { area }) => GetTags(area),
      persons: (_, { lazyLoadEvent }) => GetPersons(lazyLoadEvent),
      posts: (_, { authorId, lazyLoadEvent }) => GetPosts(authorId, lazyLoadEvent),
      post: (_, { _id }) => GetPost(_id),      
      postsTotal: (_, { authorId, lazyLoadEvent } ) => GetPostsTotal(authorId, lazyLoadEvent),
      personsTotal: (_, { lazyLoadEvent }) => GetPersonsTotal(lazyLoadEvent),
      organizations: (_, { lazyLoadEvent }) => GetOrganizations(lazyLoadEvent),
      organization: (_, { _id } ) => GetOrganization(_id),
      organizationsTotal: (_, { lazyLoadEvent }) => GetOrganizationsTotal(lazyLoadEvent),      
      profile: (_, { nickname }, { user } ) => GetProfile(nickname, user?.id),
      person: (_, { _id } ) => GetPerson(_id),
      comments: (_, { reputationObjectId, lazyLoadEvent } ) => GetComments(reputationObjectId, lazyLoadEvent),
      commentsTotal: (_, { reputationObjectId } ) => GetCommentsTotal(reputationObjectId),            
      like: (_, { reputationObjectId }, { user } ) => GetLike(reputationObjectId, user?.id),
      likes: (_, { reputationObjectId } ) => GetLikesByReputationObjectId(reputationObjectId),
      dislikes: (_, { reputationObjectId } ) => GetDislikesByReputationObjectId(reputationObjectId),
      likesFeed: (_, { userId, page } ) => GetLikesFeed(userId, page),
      isSubscribed: (_, { userId, reputationObjectId } ) => IsSubscribed(userId, reputationObjectId),
      getSubscribersTotal: (_, { reputationObjectId } ) => GetSubscribersTotal(reputationObjectId),
      getSubscribtions: (_, { userId } ) => GetSubscribtions(userId)
    },
    Mutation: {
      addProfile: (_, { nickname }, { user }) => AddProfile(nickname, user?.id),
      addPost: (_, { postInput }, { user }) => AddPost(user?.id, postInput.title, postInput.preview, postInput.post, postInput.tags),      
      updateProfile: (_, { profile }, { user }) => UpdateProfile(profile, user?.id),
      addComment: (_, { commentInput }, { user }) => AddComment(commentInput.reputationObjectId, commentInput.parentId, commentInput.comment, user?.id),
      addLike: (_, { likeInput }, { user }) => AddLike(likeInput.reputationObjectId, likeInput.isPositive, user?.id, likeInput.reputationObjectType),
      updateSubscribtion: (_, { subscribtionInput }, { user }) => UpdateSubscribtion(subscribtionInput, user?.id),
      addAssociation: (_, { associationRequest }, { user }) => AddAssociation(associationRequest, user?.id)
    },
    Person: {
      tags: ComputeTags,
      commentsTotal: GetCommentsTotalForParent,
      postsTotal: GetPostsTotalForParent
    },
    Post: {
      commentsTotal: GetCommentsTotalForParent
    },
    Organization: {
      tags: ComputeTags,
      commentsTotal: GetCommentsTotalForParent
    },
    Comment: {
      comments: ComputeComments,
      author: ComputeAuthor
    },
    Subscribtion: {
      reputationObject: GetReputationObjectForSubscribtion
    },
    UserInfo: {
      profile: GetProfileForUserInfo
    },
    Profile: {
      associations: GetAssociation,      
    },
    Association: {
      reputationObject: GetReputationObject
    },
    Like: {
      reputationObject: GetReputationObject
    },
    ReputationObjects: {
      __resolveType: obj => {
        if (obj.gender) return "Person";
        return "Organization";
      }
    },
    ReputationObject: {
      __resolveType: obj => {
        if (obj.gender) return "Person";
        return "Organization";
      }
    },    
    CommentOrOrganizationOrPersons: {
      __resolveType: obj => {
        if (obj.gender) return "Person";
        if (obj.comment) return "Comment";
        return "Organization";
      }
    },
  };

const app = express();

const apollorServer = new ApolloServer<ApolloContext>({
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
        : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
      ApolloServerPluginCacheControl({
        // Cache everything for 1 second by default.
        defaultMaxAge: 1,
        // Don't send the `cache-control` response header.
        calculateHttpHeaders: false,
      }),              
    ], 
    cache: new InMemoryLRUCache({
      maxSize: Math.pow(2, 20) * 100, // ~100MiB
      ttl: 300_000, // 5 minutes (in milliseconds)
    }),
});
  
await apollorServer.start();

app.use(express.json())
app.use(cors(corsOptionsDelegate))
app.use('/graphql', cors<cors.CorsRequest>(process.env.CORS_DOMAINS), express.json(), expressMiddleware(apollorServer, { context: GetContext }))
app.use('/static', express.static('public'))
app.use('/api', api);

app.use(responseTime((req: Request, res: Response, time: number) => {
  if (req?.route?.path) {
    restResponseTimeHistogram.observe({
      method: req.method,
      route: req.route.path,
      status_code: res.statusCode
    }, time * 1000)
  }
}))

app.listen(process.env.PORT, () => {
  logger.info(`🚀 WebAPI Server is started, port: ${process.env.PORT}`)
})

startMetricsServer();