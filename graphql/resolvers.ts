import NFT from "@/app/models/NFT"
import User from "@/app/models/User"
import dbConnect from "@/lib/mongoose"
const resolvers = {
  Query: {
    users: async (_: any, { limit }: { limit?: number }) => {
      await dbConnect()
      if (typeof limit === "number") {
        return User.find().limit(limit)
      }
      return User.find()
    },

    user: async (_: any, { id }: { id: string }) => {
      await dbConnect()
      return User.findById(id)
    },
    items: async () => {
      await dbConnect()
      return NFT.find()
    },
    item: async (_: any, { id }: { id: string }) => {
      await dbConnect()
      return User.findById(id)
    },
  },
}

export default resolvers
