import { gql } from "graphql-tag"
import { ITEM_FIELDS, USER_HALF_FIELDS } from "@/graphql/fragments"

export const GET_ITEMS_WITH_AUTHOR = gql`
  ${ITEM_FIELDS}
  ${USER_HALF_FIELDS}
  query getItemsWithAuthor($limit: Int) {
    items(limit: $limit) {
      ...ItemFields
      itemAuthor {
        ...UserHalfFields
      }
    }
  }
`
