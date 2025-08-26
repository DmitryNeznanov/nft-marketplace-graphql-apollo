import gql from "graphql-tag"

export const UPDATE_EMAIL = gql`
  mutation updateEmail($email: String!) {
    updateEmail(email: $email) {
      email
    }
  }
`