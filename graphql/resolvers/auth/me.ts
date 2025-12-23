// graphql/resolvers/auth/me.ts
import Account from "@/app/models/Account"
import { GraphQLError } from "graphql"

export async function me(_: unknown, __: unknown, context: ServerContext) {
  try {
    if (!context.account) {
      console.log("User is not authenticated")
      return null
    }
    const account = await Account.findById(context.account.accountId)
    if (!account) {
      throw new GraphQLError("Account not found")
    }
    return {
      id: account._id,
      username: account.username,
      email: account.email,
    }
  } catch (error) {
    console.error("Me query error:", error)
    if (error instanceof GraphQLError) {
      throw error
    }
    throw new GraphQLError("Internal server error. Me query failed")
  }
}
