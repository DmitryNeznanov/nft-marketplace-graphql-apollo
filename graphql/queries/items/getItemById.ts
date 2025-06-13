import { ITEM_FIELDS } from "@/graphql/fragments"
import { gql } from "graphql-tag"
export const GET_ITEM_BY_ID = gql`
  ${ITEM_FIELDS}
  query getItemById($id: ID!) {
    item(id: $id) {
      ...ItemFields
    }
  }
`
