import gql from "graphql-tag"

export const GET_ACCOUNT_BY_ID = gql`
  query getAccountById($id: ID!) {
    accountById(id: $id) {
      id
      username
      email
    }
  }
`
