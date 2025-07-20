import { gql } from "@apollo/client"

export const GET_TOTAL_COUNT_BY_ID = gql`
  query getTotalCount($id: ID!) {
    totalCountById(id: $id)
  }
`
