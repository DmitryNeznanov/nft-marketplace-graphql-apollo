import NFT from "@/app/models/NFT"
import Subscribe from "@/app/models/Subscribe"
import User from "@/app/models/User"
import dbConnect from "@/lib/mongoose"
import { Types } from "mongoose"
// ISSUE: improve search for better performance
function getItemsPipeline(q?: string) {
  const isNumeric = q && !isNaN(Number(q))
  const isObjectId = q && Types.ObjectId.isValid(q)
  return [
    {
      $addFields: {
        authorObjId: { $toObjectId: "$author" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "authorObjId",
        foreignField: "_id",
        as: "itemAuthor",
      },
    },
    { $unwind: "$itemAuthor" },
    ...(q
      ? [
          {
            $match: isObjectId
              ? { _id: new Types.ObjectId(q) }
              : isNumeric
              ? {
                  $or: [
                    { bid: { $gte: Number(q) - 0.5, $lt: Number(q) + 0.5 } },
                    { price: { $gte: Number(q) - 0.5, $lt: Number(q) + 0.5 } },
                  ],
                }
              : {
                  $or: [
                    { title: { $regex: q, $options: "i" } },
                    { content: { $regex: q, $options: "i" } },
                    { tags: { $elemMatch: { $regex: q, $options: "i" } } },
                    { "itemAuthor.name": { $regex: q, $options: "i" } },
                    { _id: { $regex: q, $options: "i" } }, // поиск по строковому id
                  ],
                },
          },
        ]
      : []),
  ]
}

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
    items: async (
      _: unknown,
      { q, limit, offset = 0 }: { q?: string; limit?: number; offset?: number }
    ) => {
      await dbConnect()

      const pipeline = [
        ...getItemsPipeline(q),
        { $skip: offset },
        ...(limit ? [{ $limit: limit }] : []),
        {
          $project: {
            id: "$_id",
            _id: 0,
            title: 1,
            author: 1,
            price: 1,
            bid: 1,
            content: 1,
            tags: 1,
            postTime: 1,
            image: 1,
            itemAuthor: 1,
          },
        },
      ]

      return NFT.aggregate(pipeline)
    },

    itemById: async (_: unknown, { id }: { id: string }) => {
      await dbConnect()
      return NFT.findById(id)
    },
    itemsByAuthorId: async (
      _: unknown,
      { id, offset = 0 }: { id: string; offset?: number }
    ) => {
      await dbConnect()
      return NFT.find({ author: id }).skip(offset)
    },
    checkSubscriberByEmail: async (
      _: unknown,
      { email }: { email: string }
    ) => {
      await dbConnect()
      const subscriber = await Subscribe.findOne({ email: email })
      return subscriber !== null
    },
    totalCount: async (_: unknown, { q }: { q?: string }) => {
      await dbConnect()

      const pipeline = [...getItemsPipeline(q), { $count: "total" }]

      const result = await NFT.aggregate(pipeline)
      return result[0]?.total || 0
    },

    totalCountByAuthorId: async (_: unknown, { id }: { id?: string }) => {
      await dbConnect()
      return NFT.countDocuments({ author: id })
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
