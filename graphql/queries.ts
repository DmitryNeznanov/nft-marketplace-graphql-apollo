import { gql } from "graphql-tag"

export const GET_ITEMS = gql`
  query {
    users {
      id
      name
      sold
      volume
      followers
      change
      info
      profileImage
      backgroundImage
    }
  }
`
export const GET_USERS = gql`
  query {
    users {
      _id
      name
      sold
      volume
      followers
      change
      info
      profileImage
      backgroundImage
    }
  }
`
