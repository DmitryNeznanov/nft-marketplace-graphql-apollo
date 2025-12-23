"use client"

import Image from "next/image"
import HeaderNav from "./HeaderNav"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function MobileMenu({
  closeMenu,
  account,
}: {
  closeMenu: () => void
  account: Account | null
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    dialogRef.current?.showModal()
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      dialogRef.current?.close()
      closeMenu()
    }, 300)
  }

  return (
    <dialog
      className="fixed inset-0 w-screen h-screen border-none bg-transparent z-[9999] text-white overflow-hidden lg:hidden"
      ref={dialogRef}
    >
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full bg-black transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-[30px] md:px-[50px] py-[15px] lg:py-[20px] h-full flex flex-col">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                className="w-[182px] h-[24px] lg:w-auto lg:h-auto"
                src="/logo.svg"
                width={243}
                height={32}
                alt="logo.svg"
              />
            </Link>
            <button
              className="hover:cursor-pointer"
              onClick={handleClose}
            >
              <Image
                src="/icons/closeMobileMenu.svg"
                width={24}
                height={24}
                alt="close"
              />
            </button>
          </div>
          <nav className="my-auto">
            <HeaderNav
              closeMenu={handleClose}
              account={account}
            />
          </nav>
        </div>
      </div>
    </dialog>
  )
}
