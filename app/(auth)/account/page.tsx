import { cookies } from "next/headers"
import apolloServer from "@/lib/apolloServer"
import { GET_ACCOUNT_BY_ID } from "@/graphql/client/account/getAccountById"
import jwt, { JwtPayload } from "jsonwebtoken"
import AccountContent from "./components/AccountContent"

const JWT_SECRET = process.env.JWT_SECRET || "your_secret"

export default async function Account() {
  const token = (await cookies()).get("token")?.value
  if (!token) {
    return (
      <section className="py-[40px]">
        <div className="max-w-sm md:container mx-auto">
          <div className="py-[30px]">
            <article>
              <h1 className="h1-sans">Account Page</h1>
              <p className="mt-[10px] md:mt-[20px] p-sans-xl capitalize">
                You are not logged in. Please sign in to view your account
                details.
              </p>
            </article>
          </div>
        </div>
      </section>
    )
  }

  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
    accountId?: string
  }
  const accountId = decoded.accountId
  if (!accountId) throw new Error("Invalid token: accountId missing.")

  const { data, loading } = await apolloServer.query({
    query: GET_ACCOUNT_BY_ID,
    variables: { id: accountId },
  })
  const account = data.accountById
  if (!data?.accountById) {
    throw new Error(`Account with id ${accountId} not found.`)
  }

  if (loading) {
    return (
      <section className="py-[40px]">
        <div className="max-w-sm md:container mx-auto">
          <div className="py-[30px]">
            <article>
              <h1 className="h1-sans">Account Page</h1>
              <p className="mt-[10px] md:mt-[20px] p-sans-xl capitalize">
                Loading account details...
              </p>
            </article>
          </div>
        </div>
      </section>
    )
  }
  return <AccountContent account={account} />
}
