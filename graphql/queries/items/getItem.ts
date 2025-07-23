import { ITEM_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_ITEM = gql`
  ${ITEM_FIELDS}
  query getItem($limit: Int) {
    items(limit: $limit) {
      ...ItemFields
    }
  }
`
