import NFT from "@/app/models/NFT"
import User from "@/app/models/User"
import dbConnect from "@/lib/mongoose"
const resolvers = {
  Query: {
    users: async (_: unknown, { limit }: { limit?: number }) => {
      await dbConnect()
      return typeof limit === "number" ? User.find().limit(limit) : User.find()
    },
    userById: async (_: unknown, { id }: { id: string }) => {
      await dbConnect()
      return User.findById(id)
    },
    item: async () => {
      await dbConnect()
      return NFT.findOne()
    },
    items: async (_: unknown, { q, limit }: { q?: string; limit?: number }) => {
      await dbConnect()
      const filter = q
        ? {
            $or: [
              // TODO: add more
              // FIXME: mongodb cant find userHalfFiels 
              { title: { $regex: q, $options: "i" } },
              { content: { $regex: q, $options: "i" } },
              { postTime: { $regex: q, $options: "i" } },
              { name: { $regex: q, $options: "i" } },
              { tags: { $elemMatch: { $regex: q, $options: "i" } } },
            ],
          }
        : {}

      return typeof limit === "number"
        ? await NFT.find(filter).limit(limit)
        : NFT.find(filter)
    },

    itemById: async (_: unknown, { id }: { id: string }) => {
      await dbConnect()
      return NFT.findById(id)
    },
  },
  Item: {
    itemAuthor: async (parent: NFT) => {
      await dbConnect()
      return User.findById(parent.author)
    },
  },
}

export default resolvers
