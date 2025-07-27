import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongoose"
import Account from "@/app/models/Account"
import { createToken } from "@/lib/createToken"

export async function signup(
  _: unknown,
  {
    username,
    email,
    password,
  }: { username: string; email: string; password: string }
) {
  await dbConnect()

  const existingAccount = await Account.findOne({ email })
  if (existingAccount) {
    throw new Error("Account already exists")
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
