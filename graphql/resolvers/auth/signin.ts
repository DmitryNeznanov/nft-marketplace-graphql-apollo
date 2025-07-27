import Account from "@/app/models/Account"
import { createToken } from "@/lib/createToken"
import dbConnect from "@/lib/mongoose"
import { compare } from "bcryptjs"

export async function signin(
  _: unknown,
  { email, password }: { email: string; password: string }
) {
  await dbConnect()

  const account = await Account.findOne({ email })
  if (!account) {
    throw new Error("Invalid email or password")
  }

  const isMatch = await compare(password, account.password)
  if (!isMatch) {
    throw new Error("Invalid email or password")
  }

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
