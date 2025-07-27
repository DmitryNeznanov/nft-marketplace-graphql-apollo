import User from "@/app/models/User"
import dbConnect from "@/lib/mongoose"

export async function userById(_: unknown, { id }: { id: string }) {
  await dbConnect()
  return User.findById(id)
}
