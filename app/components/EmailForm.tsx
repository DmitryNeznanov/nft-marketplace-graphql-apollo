"use client"

import { useState } from "react"
import { useMutation } from "@apollo/client"
import { ADD_EMAIL } from "@/graphql/client/mutations/addEmail"

export default function EmailForm() {
  const [email, setEmail] = useState("")
  const [addEmail, { loading, error }] = useMutation(ADD_EMAIL)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Некорректный формат email")
      return
    }

    try {
      const { data: resultData } = await addEmail({ variables: { email } })
      alert(`Email успешно отправлен: ${JSON.stringify(resultData, null, 2)}`)
      setEmail("")
    } catch (err: unknown) {
      if (err instanceof Error && err.message.includes("duplicate key")) {
        alert("Email уже подписан!")
      } else {
        console.error("Ошибка при добавлении email:", err)
      }
    }
  }

  return (
    <>
      <form
        className="mt-[20px]"
        onSubmit={handleSubmit}
      >
        <div className="max-w-[420px] flex flex-col sm:flex-row sm:bg-white rounded-primary">
          <input
            className="w-full py-[12px] sm:p-[20px] px-[20px] bg-white sm:bg-transparent border border-gray sm:border-0 font-work-sans text-black outline-none rounded-primary sm:rounded-[0] placeholder:text-black"
            type="email"
            placeholder="Enter your email here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className="mt-[16px] sm:mt-0 w-full py-[12px] sm:py-0 sm:w-max sm:ml-auto button-primary before:content-[url('/icons/mail.svg')] hover:scale-[95%]"
            type="submit"
            disabled={loading}
          >
            {loading ? "sending..." : "subscribe"}
          </button>
        </div>
      </form>
      {error && <p className="text-red-500 mt-2">Ошибка при отправке</p>}
    </>
  )
}
