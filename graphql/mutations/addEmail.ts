import { gql } from "graphql-tag"
export const ADD_EMAIL = gql`
  mutation addEmail($email: String!) {
    addEmail(email: $email) {
      email
    }
  }
`
