import { ITEM_FIELDS, USER_HALF_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_ITEM_BY_ID_WITH_AUTHOR = gql`
  ${ITEM_FIELDS}
  ${USER_HALF_FIELDS}
  query getItemByIdWithAuthor($id: ID!) {
    item(id: $id) {
      ...ItemFields
      itemAuthor {
        ...UserHalfFields
      }
    }
  }
`
