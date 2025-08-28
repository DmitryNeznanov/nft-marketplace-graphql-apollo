import gql from "graphql-tag"

export const UPDATE_USERNAME = gql`
  mutation updateUsername($username: String!) {
    updateUsername(username: $username) {
      username
    }
  }
`
