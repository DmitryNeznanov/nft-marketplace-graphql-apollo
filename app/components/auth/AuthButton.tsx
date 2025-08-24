"use client"

import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { LOGOUT } from "@/graphql/client/auth/logout"
import { useMe } from "@/app/providers/MeProvider"

export default function AuthButton() {
  const { account, logout } = useMe()
  const router = useRouter()

  const [logoutMutation, { loading }] = useMutation(LOGOUT, {
    context: { fetchOptions: { credentials: "include" } },
    onCompleted: () => {
      logout()
      router.push("/")
    },
    onError: (err) => {
      console.error("Logout failed:", err)
      alert(`Logout failed:\n${err}`)
    },
  })

  if (!account) {
    return (
      <a
        className="button-primary before:hidden"
        href="/signin"
      >
        Sign in
      </a>
    )
  }

  return (
    <button
      className="button-primary before:hidden"
      onClick={() => logoutMutation()}
      disabled={loading}
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  )
}
