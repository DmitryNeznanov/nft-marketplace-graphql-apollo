"use client"
import Image from "next/image"

export default function closeMobileMenu({
  closeMobileMenu,
}: {
  closeMobileMenu: React.MouseEventHandler
}) {
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
        priority={true}
      ></Image>
    </button>
  )
}
