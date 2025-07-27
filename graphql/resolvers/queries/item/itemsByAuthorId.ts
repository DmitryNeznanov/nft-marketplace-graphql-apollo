import NFT from "@/app/models/NFT"
import dbConnect from "@/lib/mongoose"

export async function itemsByAuthorId(
  _: unknown,
  { id, offset = 0 }: { id: string; offset?: number }
) {
  await dbConnect()
  return NFT.find({ author: id }).skip(offset)
}
