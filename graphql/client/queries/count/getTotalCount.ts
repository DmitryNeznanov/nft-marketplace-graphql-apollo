import { gql } from "@apollo/client"

export const GET_TOTAL_COUNT = gql`
  query getTotalCount($q: String) {
    totalCount(q: $q)
  }
`
