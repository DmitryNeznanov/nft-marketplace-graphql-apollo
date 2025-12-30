"use client"

import { useMutation } from "@apollo/client"
import { useRouter } from "next/navigation"
import { LOGOUT } from "@/graphql/client/auth/logout"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useMe } from "@/app/providers/MeProvider"

export default function AuthNav({
  account: serverAccount,
}: {
  account: Account | null
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { account, logout } = useMe()
  const [logoutMutation, { loading }] = useMutation(LOGOUT, {
    onCompleted: () => {
      logout()
      alert("Logged out successfully. you will be redirected to home page.")
      router.replace("/")
    },
    onError: (err) => {
      console.error("Logout failed:", err)
      alert(`Logout failed:\n${err}`)
    },
  })
  function toggleMenu() {
    setOpen(!open)
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!serverAccount && !account) {
    return (
      <>
        <Link
          className="p-sans font-semibold underline-primary hover:no-underline"
          href="/signin">
          Sign in
        </Link>
        <Link
          className="px-[30px] button-primary before:content-[url(/icons/user.svg)]"
          href="/signup">
          sign up
        </Link>
      </>
    )
  }
  return (
    <div
      className="relative"
      onClick={() => toggleMenu()}
      ref={menuRef}>
      <button className="p-[12px] flex items-center justify-center rounded-full bg-black-white hover:cursor-pointer">
        <Image
          className="block"
          src="/icons/user.svg"
          width={16}
          height={16}
          alt="account"></Image>
      </button>
      {open && (
        <div className="min-w-[120px] mt-[5px] -ml-[44px] absolute z-50 bg-black-white border-[2px] border-accent rounded-[10px] overflow-hidden">
          <Link
            className="w-full px-[16px] py-[8px] block hover:bg-black"
            href="/account"
            onClick={() => {
              setOpen(false)
            }}>
            Profile
          </Link>
          <button
            className="w-full py-[8px] px-[16px] block text-left text-rose-600 hover:bg-black hover:cursor-pointer"
            onClick={() => logoutMutation()}
            disabled={loading}>
            {loading ? "Logout..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  )
}
