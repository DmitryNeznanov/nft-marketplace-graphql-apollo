'use client'
import Image from "next/image"

export default function closeMobileMenu() {
  function closeMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu")!
    mobileMenu.style.width = "0%"
  }
  return (
    <button
      className="block hover:cursor-pointer"
      onClick={closeMobileMenu}
    >
      <Image
        src="/icons/closeMobileMenu.svg"
        width={24}
        height={24}
        alt="closeMobileMenu.svg"
      ></Image>
    </button>
  )
}
