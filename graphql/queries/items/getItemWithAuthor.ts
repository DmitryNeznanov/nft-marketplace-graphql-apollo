import { ITEM_FIELDS, USER_HALF_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_ITEM_WITH_AUTHOR = gql`
  ${ITEM_FIELDS}
  ${USER_HALF_FIELDS}
  query getItemWithAuthor {
    item {
      ...ItemFields
      itemAuthor {
        ...UserHalfFields
      }
    }
  }
`
