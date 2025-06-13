import { USER_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_USER_BY_ID = gql`
  ${USER_FIELDS}
  query getUserById($id: ID!) {
    user(id: $id) {
      ...UserFields
    }
  }
`
