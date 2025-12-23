import Subscribe from "@/app/models/Subscribe"
import dbConnect from "@/lib/mongoose"

export async function checkSubscriberByEmail(
  _: unknown,
  { email }: { email: string }
) {
  await dbConnect()
  const subscriber = await Subscribe.findOne({ email })
  return subscriber !== null
}
