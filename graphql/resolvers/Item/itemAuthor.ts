import User from "@/app/models/User"
import dbConnect from "@/lib/mongoose"

export async function itemAuthor(parent: NFT) {
  await dbConnect()
  return User.findById(parent.author)
}
