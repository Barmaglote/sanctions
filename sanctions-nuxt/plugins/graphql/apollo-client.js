import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from "apollo-cache-inmemory"


export default function GetApolloClient(_) {
  return {
    defaultHttpLink: false,
    link: createHttpLink({
      uri: 'http://localhost:5000/graphql/',
    }),
    authenticationType: 'Bearer',
    cache: new InMemoryCache({  })
  }
}