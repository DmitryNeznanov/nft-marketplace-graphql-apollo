import { cookies } from "next/headers"
import apolloServer from "@/lib/apolloServer"
import { GET_ACCOUNT_BY_ID } from "@/graphql/client/account/getAccountById"
import jwt, { JwtPayload } from "jsonwebtoken"
import HeaderContent from "./HeaderContent"

const JWT_SECRET = process.env.JWT_SECRET || "JWTPlaceholder"

export default async function Header() {
  const token = (await cookies()).get("token")?.value
  if (!token) return <HeaderContent account={null} />

  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
    accountId?: string
  }
  const accountId = decoded.accountId
  if (!accountId) console.log("Invalid token: accountId missing.")

  const { data } = await apolloServer.query({
    query: GET_ACCOUNT_BY_ID,
    variables: { id: accountId },
  })
  const account = data.accountById
  if (!data?.accountById) {
    throw new Error(`Account with id ${accountId} not found.`)
  }
  console.log(account)

  return <HeaderContent account={account} />
}
