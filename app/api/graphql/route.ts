import { ApolloServer } from "@apollo/server"
import { startServerAndCreateNextHandler } from "@as-integrations/next"
import { gql } from "graphql-tag"
import dbConnect from "../../../lib/mongoose"
import User from "../../models/User"

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

  type Query {
    users: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User
  }
`

const resolvers = {
  Query: {
    users: async () => {
      await dbConnect()
      return User.find()
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { name, email }: { name: string; email: string }
    ) => {
      await dbConnect()
      const user = new User({ name, email })
      return user.save()
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = startServerAndCreateNextHandler(apolloServer)

export const POST = handler
