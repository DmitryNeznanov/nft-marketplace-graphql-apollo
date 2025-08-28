import dbConnect from "@/lib/mongoose"
import { GraphQLError } from "graphql"
import Account from "@/app/models/Account"
import bcrypt from "bcryptjs"

export async function updatePassword(
  _: unknown,
  { oldPassword, newPassword }: { oldPassword: string; newPassword: string },
  context: ServerContext
) {
  try {
    await dbConnect()

    const account = context.account
    if (!account) {
      throw new GraphQLError("Not authenticated")
    }

    const user = await Account.findById(account.accountId)
    if (!user) {
      throw new GraphQLError("User not found")
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)
    if (!isMatch) {
      throw new GraphQLError("Old password is incorrect")
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const updatedUser = await Account.findByIdAndUpdate(
      account.accountId,
      { password: hashedPassword },
      { new: true }
    )

    if (!updatedUser) {
      throw new GraphQLError("User not found")
    }

    return { success: true }
  } catch (error) {
    console.error("Update password failed:", error)
    if (error instanceof GraphQLError) {
      throw error
    }
    throw new GraphQLError("Internal server error. Update password failed")
  }
}
