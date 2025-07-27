import NFT from "@/app/models/NFT"
import dbConnect from "@/lib/mongoose"
export async function item() {
  await dbConnect()
  return NFT.findOne()
}
