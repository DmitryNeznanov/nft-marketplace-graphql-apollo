import jwt from "jsonwebtoken"
import Token from "@/app/models/Token"

export async function createToken(accountId: string) {
  const JWT_SECRET = process.env.JWT_SECRET || "your_secret"

  const token = jwt.sign({ accountId }, JWT_SECRET, {
    expiresIn: "1d",
  })

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

  await Token.create({
    accountId,
    token,
    expiresAt,
  })

  return token
}
