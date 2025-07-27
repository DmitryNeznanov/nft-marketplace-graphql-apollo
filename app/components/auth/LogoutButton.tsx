"use client"

import { useApolloClient } from "@apollo/client"
import { logoutUser } from "@/lib/logoutUser"

export default function LogoutButton({ token }: { token: string }) {
  const client = useApolloClient()

  const handleLogout = () => {
    logoutUser(client)
  }

  return (
    <button
      className="button-primary before:hidden"
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}
