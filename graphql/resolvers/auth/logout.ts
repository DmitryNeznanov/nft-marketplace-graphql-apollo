import dbConnect from "@/lib/mongoose"
import Token from "@/app/models/Token"
import serializeClearTokenCookie from "@/lib/cookies/serializeClearTokenCookie"
import { GraphQLError } from "graphql"

export async function logout(_: unknown, __: unknown, context: ServerContext) {
  try {
    await dbConnect()

    const token = context.account?.token
    if (!token) {
      throw new GraphQLError("Token not provided")
    }
    await Token.deleteOne({ token: token })
    console.log("Token removed from database")

    context.setCookies.push(serializeClearTokenCookie())
    console.log("Clearing token cookie by server")

    return { success: true }
  } catch (error) {
    console.error("Logout failed:", error)
    if (error instanceof GraphQLError) {
      throw error
    }
    throw new GraphQLError("Internal server error. Logout failed")
  }
}
