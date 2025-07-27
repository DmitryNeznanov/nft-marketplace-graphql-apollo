import NFT from "@/app/models/NFT"
import dbConnect from "@/lib/mongoose"

export async function totalCountByAuthorId(
  _: unknown,
  { id }: { id?: string }
) {
  await dbConnect()
  return NFT.countDocuments({ author: id })
}
