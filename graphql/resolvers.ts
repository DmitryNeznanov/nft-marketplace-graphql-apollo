import NFT from "@/app/models/NFT"
import Subscribe from "@/app/models/Subscribe"
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
              // TODO: mongodb cant find userHalfFiels
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
    itemsByAuthorId: async (_: unknown, { id }: { id: string }) => {
      await dbConnect()
      return NFT.find({ author: id })
    },
    checkSubscriberByEmail: async (
      _: unknown,
      { email }: { email: string }
    ) => {
      await dbConnect()
      const subscriber = await Subscribe.findOne({ email: email })
      return subscriber !== null
    },
  },
  Mutation: {
    addEmail: async (_: unknown, { email }: { email: string }) => {
      await dbConnect()
      return Subscribe.create({ email })
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
