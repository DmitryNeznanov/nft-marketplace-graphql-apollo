import { ITEM_FIELDS, USER_HALF_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_ITEMS_BY_AUTHOR_ID_WITH_AUTHOR = gql`
  ${ITEM_FIELDS}
  ${USER_HALF_FIELDS}
  query getItemsByAuthorIdWithAuthor($authorId: ID) {
    itemsByAuthorId(authorId: $authorId) {
      ...ItemFields
      itemAuthor {
        ...UserHalfFields
      }
    }
  }
`
