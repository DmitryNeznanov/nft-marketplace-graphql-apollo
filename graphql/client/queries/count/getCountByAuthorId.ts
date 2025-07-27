import { gql } from "@apollo/client"

export const GET_TOTAL_COUNT_BY_AUTHOR_ID = gql`
  query getTotalCountByAuthorId($id: ID!) {
    totalCountByAuthorId(id: $id)
  }
`
