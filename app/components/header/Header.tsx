"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import HeaderNav from "./HeaderNav"
import AuthButton from "../auth/AuthButton"
import MobileMenu from "./MobileMenu"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto"
  }, [isOpen])

  function openMenu() {
    setIsOpen(true)
  }
  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <>
      <header className="w-full bg-black px-[5px] lg:px-[50px] 2xl:px-[175px] py-[15px] lg:py-[20px]">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo.svg"
              width={243}
              height={32}
              alt="logo.svg"
              className="w-[182px] h-[24px] lg:w-auto lg:h-auto p-[10px] -m-[10px] box-content"
            />
          </Link>

          <div className="flex items-center gap-[40px]">
            <div className="hidden lg:block">
              <HeaderNav />
            </div>
            <div className="hidden lg:flex items-center gap-[10px]">
              <AuthButton />
              <Link
                className="px-[30px] button-primary before:content-[url(/icons/user.svg)]"
                href="signup"
              >
                sign up
              </Link>
            </div>
            <div className="lg:hidden">
              <button
                onClick={openMenu}
                className="block hover:cursor-pointer"
              >
                <Image
                  src="/icons/openMobileMenu.svg"
                  width={24}
                  height={24}
                  alt="openMobileMenu"
                />
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div>{isOpen && <MobileMenu closeMenu={closeMenu} />}</div>
    </>
  )
}
