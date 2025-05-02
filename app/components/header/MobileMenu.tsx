"use client"
import Image from "next/image"
import CloseMobileMenu from "./CloseMobileMenu"
import HeaderNav from "./HeaderNav"
import Link from "next/link"

export default function MobileMenu() {
  function closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu")!
    mobileMenu.style.width = "0%"
  }
  return (
    <section
      className="h-screen mx-auto absolute top-0 right-0 transition-[width] duration-[700ms] overflow-hidden bg-black z-[9999]"
      id="mobileMenu"
      style={{ width: "0%" }}
    >
      <div className="px-[30px] md:px-[50px] py-[15px] lg:py-[20px]">
        <header className="flex flex-row justify-between">
          <div>
            <Link href="/">
              <div className="w-max">
                <Image
                  className="block w-[182px] h-[24px] lg:w-auto lg:h-auto p-[10px] -m-[10px] box-content"
                  src="/logo.svg"
                  width={243}
                  height={32}
                  alt="logo.svg"
                ></Image>
              </div>
            </Link>
          </div>
          <div className="w-max">
            <CloseMobileMenu closeMobileMenu={closeMobileMenu} />
          </div>
        </header>
        <div className="mt-[50px]">
          <HeaderNav closeMobileMenu={closeMobileMenu} />
        </div>
      </div>
    </section>
  )
}
