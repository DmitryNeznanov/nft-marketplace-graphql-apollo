import gql from "graphql-tag"

export const DELETE_ACCOUNT = gql`
  mutation deleteAccount($password: String!) {
    deleteAccount(password: $password) {
      success
    }
  }
`
