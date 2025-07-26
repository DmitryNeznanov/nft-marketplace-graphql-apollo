import { gql } from "@apollo/client"

export const SIGNUP = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      account {
        id
        username
        email
      }
    }
  }
`
