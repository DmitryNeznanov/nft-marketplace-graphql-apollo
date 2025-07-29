import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongoose"
import Account from "@/app/models/Account"
import { createToken } from "@/lib/createToken"
import { GraphQLError } from "graphql"

export async function signup(
  _: unknown,
  {
    username,
    email,
    password,
  }: { username: string; email: string; password: string }
) {
  await dbConnect()

  const existingAccounts = await Account.find({
    $or: [{ email }, { username }],
  })

  const errorMessages = []
  const errorCodes = []

  for (const acc of existingAccounts) {
    if (acc.email === email) {
      errorMessages.push("Email already in use")
      errorCodes.push("EMAIL_EXISTS")
    }
    if (acc.username === username) {
      errorMessages.push("Username already taken")
      errorCodes.push("USERNAME_EXISTS")
    }
  }

  if (errorMessages.length > 0) {
    throw new GraphQLError(errorMessages.join("\n"), {
      extensions: {
        code: "MULTIPLE_CONFLICTS",
        issues: errorCodes,
      },
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const account = await Account.create({
    username: username,
    email: email,
    password: hashedPassword,
  })

  const token = await createToken(account._id.toString())

  return {
    token,
    account: {
      id: account._id,
      username: account.username,
      email: account.email,
    },
  }
}
