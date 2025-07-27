import Token from "@/app/models/Token"
import dbConnect from "@/lib/mongoose"

export async function logout(_: unknown, { token }: { token: string }) {
  await dbConnect()

  const result = await Token.deleteOne({ token })
  console.log("token deleted:", token)

  return result.deletedCount > 0
}
