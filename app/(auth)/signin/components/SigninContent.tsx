"use client"

import Image from "next/image"
import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { SIGNIN } from "@/graphql/client/auth/signin"
import { useRouter } from "next/navigation"
import { useMe } from "@/app/providers/MeProvider"

type FormData = {
  email: string
  password: string
}

export default function SigninContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    criteriaMode: "all",
    reValidateMode: "onSubmit",
  })

  const { login } = useMe()
  const router = useRouter()

  const [signin, { loading, error }] = useMutation(SIGNIN, {
    fetchPolicy: "no-cache",
  })

  const allErrors = [
    ...Object.values(errors).map((e) => e?.message || ""),
    ...(error?.graphQLErrors.map((e) => e.message) || []),
  ]
  async function onSubmit(data: FormData) {
    try {
      const response = await signin({ variables: data })
      const account = response.data?.signin?.account
      if (!account) throw new Error("User not found")

      login(account)
      router.replace("/account")
    } catch (err) {
      console.error("Sign-in failed:", err)
    }
  }
  return (
    <section className="flex flex-col md:flex-row md:items-center gap-x-[40px] lg:gap-x-[60px]">
      <div className="md:max-w-[50%]">
        <Image
          src="/signin.png"
          width={610}
          height={691}
          alt="signin"
          className="w-screen h-screen max-h-[232px] md:max-h-[615px] lg:max-h-[691px]"
        />
      </div>

      <div className="max-w-sm mx-auto md:mx-0 md:max-w-[50%]">
        <h2 className="h2-sans">Login Account</h2>
        <p className="mt-[20px] p-sans-xl capitalize">
          Enter your Email and password to login in account
        </p>

        <form
          className="mt-[30px] lg:mt-[40px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="md:max-w-[330px] flex flex-col gap-y-[15px]">
            <label className="w-full py-[12px] flex gap-x-[12px] input-primary">
              <Image
                src="/icons/mail-gray.svg"
                width={20}
                height={20}
                alt="mail"
              />
              <input
                className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                type="email"
                placeholder="email address"
                {...register("email", {
                  required: "Email is required!",
                  minLength: {
                    value: 6,
                    message: "Email must be at least 6 characters",
                  },
                  maxLength: {
                    value: 254,
                    message: "Email must be at most 254 characters",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: "Invalid email",
                  },
                })}
              />
            </label>

            <label className="w-full py-[12px] flex gap-x-[12px] input-primary">
              <Image
                src="/icons/password-gray.svg"
                width={20}
                height={20}
                alt="password"
              />
              <input
                className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                type="password"
                placeholder="password"
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 64,
                    message: "Password must be at most 64 characters",
                  },
                })}
              />
            </label>
          </div>

          <button
            className="w-full py-[12px] md:max-w-[330px] mt-[30px] button-primary before:hidden"
            type="submit"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {allErrors.length > 0 && (
            <ul className="mt-[15px] px-[20px] flex flex-col gap-y-[2px] list-disc list-inside">
              {allErrors.map((err, i) => (
                <li
                  key={i}
                  className="p-sans text-[14px] text-rose-500"
                >
                  {err}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </section>
  )
}
