import NFT from "@/app/models/NFT"
import User from "@/app/models/User"
import dbConnect from "@/lib/mongoose"
const resolvers = {
  Query: {
    users: async (_: any, { limit }: { limit?: number }) => {
      await dbConnect()
      return typeof limit === "number" ? User.find().limit(limit) : User.find()
    },

    user: async (_: any, { id }: { id: string }) => {
      await dbConnect()
      return User.findById(id)
    },

    items: async (_: any, { limit }: { limit?: number }) => {
      await dbConnect()
      return typeof limit === "number" ? NFT.find().limit(limit) : NFT.find()
    },

    item: async (_: any, { id }: { id: string }) => {
      await dbConnect()
      return NFT.findById(id)
    },
  },
  Item: {
    itemAuthor: async (parent: any) => {
      await dbConnect()
      return User.findById(parent.author)
    },
  },
}

export default resolvers
