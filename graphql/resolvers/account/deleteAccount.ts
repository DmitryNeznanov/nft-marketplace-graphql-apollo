import dbConnect from "@/lib/mongoose"
import { GraphQLError } from "graphql"
import Token from "@/app/models/Token"
import Account from "@/app/models/Account"
import serializeClearTokenCookie from "@/lib/cookies/serializeClearTokenCookie"
import { compare } from "bcryptjs"
export async function deleteAccount(
  _: unknown,
  { password }: { password: string },
  context: ServerContext
) {
  try {
    await dbConnect()

    const account = context.account
    if (!account) {
      throw new GraphQLError("Not authenticated")
    }

    const existingUser = await Account.findById(account.accountId)
    if (!existingUser) {
      throw new GraphQLError("User not found")
    }
    const isPasswordValid = await compare(password, existingUser.password)
    if (!isPasswordValid) {
      throw new GraphQLError("Invalid password")
    }
    await Account.findByIdAndDelete(account.accountId)

    await Token.deleteMany({ accountId: account.accountId })
    console.log("All tokens for the account removed from database")

    context.setCookies.push(serializeClearTokenCookie())
    console.log("Clearing token cookie by server")
    return { success: true }
  } catch (error) {
    console.error("Delete account failed:", error)
    if (error instanceof GraphQLError) {
      throw error
    }
    throw new GraphQLError("Internal server error. Delete account failed")
  }
}
