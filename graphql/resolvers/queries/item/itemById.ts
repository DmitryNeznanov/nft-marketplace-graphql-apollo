import NFT from "@/app/models/NFT"
import dbConnect from "@/lib/mongoose"

export async function itemById(_: unknown, { id }: { id: string }) {
  await dbConnect()
  return NFT.findById(id)
}
