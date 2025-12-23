import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongoose"
import Account from "@/app/models/Account"
import { GraphQLError } from "graphql"

export async function signup(
  _: unknown,
  {
    username,
    email,
    password,
  }: { username: string; email: string; password: string }
) {
  try {
    await dbConnect()

    const emailExists = await Account.findOne({ email })
    if (emailExists) {
      throw new GraphQLError("Email already exists")
    }
    const usernameExists = await Account.findOne({ username })
    if (usernameExists) {
      throw new GraphQLError("Username already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const account = await Account.create({
      username: username,
      email: email,
      password: hashedPassword,
    })

    console.log("Account created:", account)
    return {
      account: {
        id: account._id,
        username: account.username,
        email: account.email,
      },
    }
  } catch (error) {
    console.error("Signup error:", error)
    if (error instanceof GraphQLError) {
      throw error
    }
    throw new GraphQLError("Internal server error. Signup failed")
  }
}
