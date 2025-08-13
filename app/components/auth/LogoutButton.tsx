"use client"

import { useMutation } from "@apollo/client"
import { LOGOUT } from "@/graphql/client/auth/logout"

export default function LogoutButton() {
  const [logoutMutation, { loading }] = useMutation(LOGOUT, {
    context: { fetchOptions: { credentials: "include" } },
  })

  async function handleLogout() {
    try {
      const { data } = await logoutMutation()
      if (data?.logout?.success) {
        window.location.href = "/"
      }
    } catch (err) {
      console.error("Logout failed:", err)
    }
  }

  return (
    <button
      className="button-primary before:hidden"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  )
}
