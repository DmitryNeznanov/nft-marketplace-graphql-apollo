"use client"

import { LOGOUT } from "@/graphql/client/auth/logout"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()
  const [logout] = useMutation(LOGOUT)

  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    if (!token) return

    try {
      await logout({ variables: { token } })
      localStorage.removeItem("token")
      router.push("/")
    } catch (err) {
      console.error("Logout error", err)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="button-primary"
    >
      Logout
    </button>
  )
}
