import { USER_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_USERS = gql`
  ${USER_FIELDS}
  query getUsers($limit: Int) {
    users(limit: $limit) {
      ...UserFields
    }
  }
`
