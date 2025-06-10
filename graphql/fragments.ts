import { gql } from "@apollo/client"

export const USER_FIELDS = gql`
  fragment UserFields on User {
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
`
export const ITEM_FIELDS = gql`
  fragment ItemFields on Item {
    _id
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
