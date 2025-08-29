// graphql/resolvers/account/accountById.ts
import Account from "@/app/models/Account"
import dbConnect from "@/lib/mongoose"
import { GraphQLError } from "graphql"

export async function accountById(_: unknown, { id }: { id: string }) {
  await dbConnect()
  const account = await Account.findById(id)
  if (!account) throw new GraphQLError(`Account not found`)
  return account
}
