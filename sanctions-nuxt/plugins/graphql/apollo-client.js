import { createHttpLink } from 'apollo-link-http'

export default function GetApolloClient(_) {
  return {
    defaultHttpLink: false,
    link: createHttpLink({
      uri: 'http://localhost:5000/graphql/',
    }),
    authenticationType: 'Bearer'
  }
}