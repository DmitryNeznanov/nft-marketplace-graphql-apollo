// graphql/client/auth/me.ts
import { gql } from "@apollo/client"

export const ME = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`
