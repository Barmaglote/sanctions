import gql from 'graphql-tag'

export const LINKS_QUERY = gql`
    query Query {
      links {
        description
        foto
        id
        link
        type
      }
    }
`