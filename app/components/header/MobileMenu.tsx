"use client"

import Image from "next/image"
import HeaderNav from "./HeaderNav"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function MobileMenu({ closeMenu }: { closeMenu: () => void }) {
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
    }, 300) // время совпадает с transition
  }

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 w-screen h-screen m-0 p-0 border-none bg-transparent z-[9999] overflow-hidden"
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
          <header className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                width={243}
                height={32}
                alt="logo.svg"
                className="w-[182px] h-[24px] lg:w-auto lg:h-auto"
              />
            </Link>
            <button onClick={handleClose}>
              <Image
                src="/icons/closeMobileMenu.svg"
                width={24}
                height={24}
                alt="close"
              />
            </button>
          </header>
          <nav className="mt-[50px] flex-1">
            <HeaderNav closeMenu={handleClose} />
          </nav>
        </div>
      </div>
    </dialog>
  )
}
