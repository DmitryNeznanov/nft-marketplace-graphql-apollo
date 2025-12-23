import User from "@/app/models/User"
import dbConnect from "@/lib/mongoose"

export async function users(_: unknown, { limit }: { limit?: number }) {
  await dbConnect()
  return typeof limit === "number" ? User.find().limit(limit) : User.find()
}
