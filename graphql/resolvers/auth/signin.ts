// graphql/resolvers/auth/signin.ts
import Account from "@/app/models/Account"
import dbConnect from "@/lib/mongoose"
import { compare } from "bcryptjs"
import { createToken } from "@/lib/createToken"
import serializeTokenCookie from "@/lib/cookies/serializeTokenCookie"
import { GraphQLError } from "graphql"
export async function signin(
  _: unknown,
  { email, password }: { email: string; password: string },
  context: ServerContext
) {
  try {
    await dbConnect()

    const account = await Account.findOne({ email })
    if (!account) throw new GraphQLError("Account not found")

    const isMatch = await compare(password, account.password)
    if (!isMatch) throw new GraphQLError("Invalid email or password")

    const token = await createToken(account._id.toString())

    const cookie = serializeTokenCookie(token)
    console.log("Token was created and set in HttpOnly cookie by server")
    if (!cookie) {
      console.error("Failed to serialize auth cookie")
      throw new GraphQLError("Internal server error. Signin failed")
    }
    context.setCookies.push(cookie)
    console.log("Cookie token set successfully")

    return {
      account: {
        id: account._id,
        username: account.username,
        email: account.email,
      },
      tokenSet: Boolean(cookie),
    }
  } catch (error) {
    console.error("Signin error:", error)
    if (error instanceof GraphQLError) {
      throw error
    }
    throw new GraphQLError("Internal server error. Signin failed")
  }
}
