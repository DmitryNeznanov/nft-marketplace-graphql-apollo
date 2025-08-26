"use client"

import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

interface ModalProps {
  children: ReactNode
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.back()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [router])

  return (
    <div className="fixed inset-0 bg-black/65 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-black-white rounded-primary p-[48px] border-[2px] border-accent">
        {children}
      </div>
    </div>
  )
}
