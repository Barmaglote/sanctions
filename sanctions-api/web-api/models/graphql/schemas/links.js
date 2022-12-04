const { GraphQLSchema, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLNonNull, GraphQLEnumType } = require('graphql')
const { Links } = require('../../../controllers/graphql/links.js')

const LinkEnumType = new GraphQLEnumType({
  name: 'LinkEnumType',
  values: {
    YOUTUBE: { value: 'youtube' },
    CHATIRY: { value: 'charity' },
    NEWSPAPERS: { value: 'newspapers' },
    TELEGRAM: { value: 'telegram' }
  }
})

const LinkType = new GraphQLObjectType({
  name: 'Link',
  description: 'This represents a link to html resource (blog, web-site, youtube-media and so on)',
  fields: () => ({
    type: { type: new GraphQLNonNull(LinkEnumType) },
    titlerus: { type: new GraphQLNonNull(GraphQLString) },
    titleeng: { type: new GraphQLNonNull(GraphQLString) },
    link: { type: new GraphQLNonNull(GraphQLString) },
    foto: { type: new GraphQLNonNull(GraphQLString) }
  })
})

const LinksRootQueryType = new GraphQLObjectType({
  name: 'LinksRootType',
  description: 'Queries for links',
  fields: () => ({
    links: {
      type: new GraphQLList(LinkType),
      description: 'Get all links',
      args: {
        type: { type: LinkEnumType }
      },
      resolve: async (_, { type }) => {
        return await Links()(type)
      }
    }
  })
})

const LinksGQLSchema = new GraphQLSchema({
  query: LinksRootQueryType
})

module.exports = LinksGQLSchema
