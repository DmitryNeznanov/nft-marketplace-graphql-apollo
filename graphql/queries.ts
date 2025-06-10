import { gql } from "graphql-tag"
import { ITEM_FIELDS, USER_FIELDS } from "./fragments"

export const GET_ITEMS = gql`
  ${ITEM_FIELDS}
  query getItems($limit: Int) {
    items(limit: $limit) {
      ...ItemFields
    }
  }
`
export const GET_ITEM_BY_ID = gql`
  ${ITEM_FIELDS}
  query GetItem($id: ID!) {
    item(id: $id) {
      ...ItemFields
    }
  }
`
export const GET_USERS = gql`
  ${USER_FIELDS}
  query getUsers($limit: Int) {
    users(limit: $limit) {
      ...UserFields
    }
  }
`
export const GET_USER_BY_ID = gql`
  ${USER_FIELDS}
  query GetItem($id: ID!) {
    user(id: $id) {
      ...UserFields
    }
  }
`
