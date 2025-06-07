"use client"

import { useState } from "react"

export default function CopyIdButton({ userId }: { userId: string }) {
  const [copied, setCopied] = useState(false)

  function copyId() {
    navigator.clipboard.writeText(userId).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative">
      <button
        className="w-full md:w-max button-primary before:content-[url('/icons/copy.svg')]"
        onClick={copyId}
      >
        <span className="max-w-[115px] text-ellipsis overflow-hidden">
          {userId}
        </span>
      </button>

      {copied && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-accent text-white px-3 py-1 font-semibold rounded-primary transition-all duration-300 pointer-events-none">
          Copied!
        </div>
      )}
    </div>
  )
}
