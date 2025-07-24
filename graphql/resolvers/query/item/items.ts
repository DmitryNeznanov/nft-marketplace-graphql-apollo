import NFT from "@/app/models/NFT"
import dbConnect from "@/lib/mongoose"
import { getItemsPipeline } from "../../utils/getItemsPipeline"

export async function items(
  _: unknown,
  { q, limit, offset = 0 }: { q?: string; limit?: number; offset?: number }
) {
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
}
