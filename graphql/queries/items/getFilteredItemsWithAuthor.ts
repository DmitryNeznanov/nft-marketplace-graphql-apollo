import { ITEM_FIELDS, USER_HALF_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_FILTERED_ITEMS_WITH_AUTHOR = gql`
  ${ITEM_FIELDS}
  ${USER_HALF_FIELDS}
  query getFilteredItemsWithAuthor($q: String, $limit: Int) {
    items(q: $q, limit: $limit) {
      ...ItemFields
      itemAuthor {
        ...UserHalfFields
      }
    }
  }
`
