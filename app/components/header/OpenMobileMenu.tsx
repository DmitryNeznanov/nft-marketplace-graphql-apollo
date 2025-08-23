"use client"
import Image from "next/image"

export default function OpenMobileMenu() {
  function openMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu")!
    document.body.style.overflow = "hidden"
    mobileMenu.style.width = "100%"
  }
  return (
    <button
      className="block hover:cursor-pointer"
      onClick={openMobileMenu}
    >
      <Image
        src="/icons/openMobileMenu.svg"
        width={24}
        height={24}
        alt="openMobileMenu.svg"
      ></Image>
    </button>
  )
}
