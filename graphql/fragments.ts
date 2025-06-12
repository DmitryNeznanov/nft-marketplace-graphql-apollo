import { gql } from "@apollo/client"
export const USER_HALF_FIELDS = gql`
  fragment UserHalfFields on User {
    id
    name
    profileImage
  }
`
export const USER_FIELDS = gql`
  ${USER_HALF_FIELDS}
  fragment UserFields on User {
    ...UserHalfFields
    sold
    volume
    followers
    change
    info
    backgroundImage
  }
`

export const ITEM_FIELDS = gql`
  fragment ItemFields on Item {
    id
    title
    author
    price
    bid
    content
    tags
    postTime
    image
  }
`
