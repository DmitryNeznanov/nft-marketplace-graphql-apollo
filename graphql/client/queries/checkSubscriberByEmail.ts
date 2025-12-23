// graphql/queries/subscribers/checkSubscriberByEmail.ts
import { gql } from "@apollo/client"

export const CHECK_SUBSCRIBER_BY_EMAIL = gql`
  query checkSubscriberByEmail($email: String!) {
    checkSubscriberByEmail(email: $email)
  }
`
