import { ITEM_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_ITEMS = gql`
  ${ITEM_FIELDS}
  query getItems($limit: Int) {
    items(limit: $limit) {
      ...ItemFields
    }
  }
`
