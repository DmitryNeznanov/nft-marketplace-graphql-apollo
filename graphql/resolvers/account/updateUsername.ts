import Account from "@/app/models/Account"
import dbConnect from "@/lib/mongoose"
import { GraphQLError } from "graphql"

export async function updateUsername(
  _: unknown,
  { username }: { username: string },
  context: ServerContext
) {
  try {
    await dbConnect()

    const account = context.account
    if (!account) {
      throw new GraphQLError("Not authenticated")
    }

    const existingUser = await Account.findOne({ username: username })
    if (existingUser) {
      throw new GraphQLError("Username is already in use")
    }

    const updatedUser = await Account.findByIdAndUpdate(
      account?.accountId,
      { username: username },
      { new: true }
    )

    if (!updatedUser) {
      throw new GraphQLError("User not found")
    }

    return updatedUser
  } catch (error) {
    console.error("Update username failed:", error)
    if (error instanceof GraphQLError) {
      throw error
    }
    throw new GraphQLError("Internal server error. Update username failed")
  }
}
