import NFT from "@/app/models/NFT"
import dbConnect from "@/lib/mongoose"
import { getItemsPipeline } from "../../utils/getItemsPipeline"
export async function totalCount(_: unknown, { q }: { q?: string }) {
  await dbConnect()

  const pipeline = [...getItemsPipeline(q), { $count: "total" }]
  const result = await NFT.aggregate(pipeline)
  return result[0]?.total || 0
}
