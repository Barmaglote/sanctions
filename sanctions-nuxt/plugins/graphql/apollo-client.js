import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, IntrospectionFragmentMatcher } from "apollo-cache-inmemory"
import possibleTypes from "./possibleTypes.v2.json"

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: possibleTypes
})

export default function GetApolloClient(_) {
  return {
    defaultHttpLink: false,
    link: createHttpLink({
      uri: 'http://localhost:5000/graphql/',
    }),
    authenticationType: 'Bearer',
    cache: new InMemoryCache({ fragmentMatcher })
  }
}
