import Account from "@/app/models/Account"
import dbConnect from "@/lib/mongoose"
import { GraphQLError } from "graphql"
export async function updateEmail(
  _: unknown,
  { email }: { email: string },
  context: ServerContext
) {
  try {
    await dbConnect()

    const account = context.account
    if (!account) {
      throw new GraphQLError("Not authenticated")
    }

    const existingUser = await Account.findOne({ email: email })
    if (existingUser) {
      throw new GraphQLError("Email is already in use")
    }

    const updatedUser = await Account.findByIdAndUpdate(
      account?.accountId,
      { email: email },
      { new: true }
    )

    if (!updatedUser) {
      throw new GraphQLError("User not found")
    }

    return updatedUser
  } catch (error) {
    console.error("Update email failed:", error)
    if (error instanceof GraphQLError) {
      throw error
    }
    throw new GraphQLError("Internal server error. Update email failed")
  }
}
