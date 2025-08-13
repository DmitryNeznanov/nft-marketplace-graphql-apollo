import { gql } from "@apollo/client"

export const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      account {
        id
        username
        email
      }
    }
  }
`
