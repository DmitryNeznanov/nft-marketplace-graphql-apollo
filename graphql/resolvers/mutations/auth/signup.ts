import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongoose"
import Token from "@/app/models/Token"
import Account from "@/app/models/Account"

const JWT_SECRET = process.env.JWT_SECRET || "your_secret"

export const signup = async (
  _: unknown,
  {
    username,
    email,
    password,
  }: { username: string; email: string; password: string }
) => {
  await dbConnect()

  const existingUser = await Account.findOne({ email })
  if (existingUser) {
    throw new Error("Account already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await Account.create({
    username: username,
    email: email,
    password: hashedPassword,
  })

  const token = jwt.sign({ accountId: user._id }, JWT_SECRET, {
    expiresIn: "1d",
  })

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 1)

  await Token.create({ accountId: user._id, token, expiresAt: expiresAt })

  return {
    token,
    account: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  }
}
