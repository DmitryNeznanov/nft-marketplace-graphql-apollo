"use client"

import { useMutation, useQuery } from "@apollo/client"
import { LOGOUT } from "@/graphql/client/auth/logout"
import { ME } from "@/graphql/client/auth/me"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AuthButton() {
  const {
    data,
    loading: meLoading,
    error,
  } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
    context: { fetchOptions: { credentials: "include" } },
  })

  const [logoutMutation, { loading: logoutLoading }] = useMutation(LOGOUT, {
    context: { fetchOptions: { credentials: "include" } },
    refetchQueries: [{ query: ME }],
  })
  const router = useRouter()
  async function handleLogout() {
    try {
      const { data } = await logoutMutation()
      if (data?.logout?.success) {
        console.log("User logged out successfully")
        alert(
          "You have been logged out successfully. close window to continue. you will be redirected to home page"
        )
        router.push("/")
      }
    } catch (err) {
      console.error("Logout failed:", err)
      alert(`Logout failed:\n\ ${err}`)
    }
  }
  if (meLoading)
    return (
      <button
        className="button-primary before:hidden"
        disabled
      >
        ...
      </button>
    )
  if (error) {
    console.error("Error fetching user data:", error)
  }
  const user = data?.me
  return (
    <>
      {user ? (
        <button
          className="button-primary before:hidden"
          onClick={handleLogout}
          disabled={logoutLoading}
        >
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>
      ) : (
        <Link
          className="button-primary before:hidden"
          href="/signin"
        >
          Sign in
        </Link>
      )}
    </>
  )
}
