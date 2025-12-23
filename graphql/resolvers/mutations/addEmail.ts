import Subscribe from "@/app/models/Subscribe"
import dbConnect from "@/lib/mongoose"

export async function addEmail(_: unknown, { email }: { email: string }) {
  await dbConnect()
  return Subscribe.create({ email })
}
