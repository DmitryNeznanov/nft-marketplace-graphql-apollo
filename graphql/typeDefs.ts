import { gql } from "graphql-tag"

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    sold: Int!
    volume: Float!
    followers: Int!
    change: Float!
    info: String!
    profileImage: String!
    backgroundImage: String!
  }
  type Item {
    id: ID!
    title: String!
    author: String!
    price: Float!
    bid: Float!
    content: String!
    tags: [String!]!
    postTime: String!
    image: String!
    itemAuthor: User
  }
  type Email {
    id: ID!
    email: String!
  }
  type Account {
    id: ID!
    username: String!
    email: String!
  }
  type AuthPayload {
    account: Account!
    tokenSet: Boolean
  }
  type SuccessResponse {
    success: Boolean!
  }
  type Query {
    users(limit: Int): [User!]!
    userById(id: ID!): User!
    item: Item!
    items(q: String, limit: Int, offset: Int): [Item!]!
    itemById(id: ID!): Item!
    itemsByAuthorId(id: ID!, offset: Int): [Item!]!
    checkSubscriberByEmail(email: String!): Email!
    totalCount(q: String): Int!
    totalCountByAuthorId(id: ID!): Int!
    me: Account!
    accountById(id: ID!): Account!
  }
  type Mutation {
    addEmail(email: String!): Email!
    signup(username: String!, email: String!, password: String!): AuthPayload!
    signin(email: String!, password: String!): AuthPayload!
    logout: SuccessResponse!
    updateEmail(email: String!): Account!
    updateUsername(username: String!): Account!
    deleteAccount(password: String!): SuccessResponse!
    updatePassword(oldPassword: String!, newPassword: String!): SuccessResponse!
  }
`
// ISSUE: scalar value for Date?
export default typeDefs
