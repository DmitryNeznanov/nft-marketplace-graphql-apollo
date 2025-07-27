import { LOGOUT } from "@/graphql/client/auth/logout"
import { ApolloClient } from "@apollo/client"

export async function logoutUser(client: ApolloClient<any>) {
  try {
    const { data } = await client.mutate({
      mutation: LOGOUT,
    })

    if (data?.logout?.success) {
      await fetch("/api/logout", { method: "POST" })
      window.location.href = "/"
    } else {
      console.error("Logout mutation did not return success")
    }
  } catch (error) {
    console.error("Logout failed:", error)
  }
}
