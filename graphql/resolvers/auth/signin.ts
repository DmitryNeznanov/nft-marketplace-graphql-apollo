// resolvers/auth.ts
import Account from "@/app/models/Account"
import dbConnect from "@/lib/mongoose"
import { compare } from "bcryptjs"
import { createToken } from "@/lib/createToken"
import { setTokenCookie } from "@/lib/setTokenCookie"
import { NextResponse } from "next/server"

export async function signin(
  _: unknown,
  { email, password }: { email: string; password: string },
  { res }: { res: NextResponse }
) {
  await dbConnect()

  const account = await Account.findOne({ email })
  if (!account) throw new Error("Invalid email or password")

  const isMatch = await compare(password, account.password)
  if (!isMatch) throw new Error("Invalid email or password")

  const token = await createToken(account._id.toString())

  setTokenCookie(res, token)

  return {
    account: {
      id: account._id,
      username: account.username,
      email: account.email,
    },
  }
}
