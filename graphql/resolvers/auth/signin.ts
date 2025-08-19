// graphql/resolvers/auth/signin.ts
import Account from "@/app/models/Account"
import dbConnect from "@/lib/mongoose"
import { compare } from "bcryptjs"
import { createToken } from "@/lib/createToken"
import serializeTokenCookie from "@/lib/cookies/serializeTokenCookie"
export async function signin(
  _: unknown,
  { email, password }: { email: string; password: string },
  context: ServerContext
) {
  await dbConnect()

  const account = await Account.findOne({ email })
  if (!account) throw new Error("Invalid email or password")

  const isMatch = await compare(password, account.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const token = await createToken(account._id.toString())

  context.setCookies.push(serializeTokenCookie(token))

  return {
    account: {
      id: account._id.toString(),
      username: account.username,
      email: account.email,
    },
  }
}
