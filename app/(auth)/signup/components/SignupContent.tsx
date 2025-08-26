"use client"
import Image from "next/image"
import { useMutation } from "@apollo/client"
import { SIGNUP } from "@/graphql/client/auth/signup"
import { useForm } from "react-hook-form"
type FormData = {
  username: string
  email: string
  password: string
  confirmPassword: string
}
export default function SignupContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({ criteriaMode: "all", reValidateMode: "onSubmit" })

  const [signup, { loading, error }] = useMutation(SIGNUP, {
    fetchPolicy: "no-cache",
  })
  const allErrors = [
    ...Object.values(errors).map((e) => e?.message || ""),
    ...(error?.graphQLErrors.map((e) => e.message) || []),
  ]

  async function onSubmit(data: FormData) {
    const response = await signup({
      variables: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    })
    const account = response.data?.signup?.account

    alert(
      `Account created successfully! You can now log in.\n\Your account:\n\ ${JSON.stringify(
        account,
        null,
        2
      )}`
    )
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:gap-x-[40px] lg:gap-x-[60px]">
        <div className="md:max-w-[50%] flex-1">
          <Image
            className="w-screen h-screen max-h-[232px] md:max-h-[615px] lg:max-h-[691px]"
            src="/signup.png"
            width={610}
            height={691}
            alt="signup.png"
          ></Image>
        </div>
        <div className="max-w-sm mx-auto md:mx-0 md:max-w-[50%]">
          <div className="pt-[30px] pb-[40px] md:pt-0 md:pb-0 flex flex-col">
            <article className="max-w-[460px]">
              <h2 className="h2-sans">Create Account</h2>
              <p className="mt-[20px] p-sans-xl capitalize">
                Welcome! enter your details and start creating, collecting and
                selling NFTs.
              </p>
            </article>
            <form
              className="mt-[30px] lg:mt-[40px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:max-w-[330px] flex flex-col gap-y-[15px]">
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/user-gray.svg"
                    width={20}
                    height={20}
                    alt="user-gray.svg"
                  ></Image>
                  <input
                    className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="text"
                    placeholder="username"
                    minLength={3}
                    maxLength={20}
                    {...register("username", {
                      required: "Username is required!",
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Username must be at most 20 characters",
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message: "Username contains invalid characters",
                      },
                    })}
                  />
                </label>
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/mail-gray.svg"
                    width={20}
                    height={20}
                    alt="mail-gray.svg"
                  ></Image>
                  <input
                    className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="email"
                    placeholder="email adress"
                    minLength={6}
                    maxLength={254}
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
                        message: "Email contains invalid characters",
                      },
                    })}
                  />
                </label>
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/password-gray.svg"
                    width={20}
                    height={20}
                    alt="password-gray.svg"
                  ></Image>
                  <input
                    className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="password"
                    placeholder="password"
                    minLength={8}
                    maxLength={64}
                    {...register("password", {
                      required: "Password is required!",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      maxLength: {
                        value: 64,
                        message: "Password must be at most 64 characters",
                      },
                      pattern: {
                        value: /[A-Za-z]/,
                        message: "Password must contain at least one letter",
                      },
                      validate: {
                        safeCharacters: (v) =>
                          /^[A-Za-z\d@$!%*?&]+$/.test(v) ||
                          "Password contains invalid characters",
                      },
                    })}
                  />
                </label>
                <label className="w-full py-[12px] flex flex-row gap-x-[12px] input-primary">
                  <Image
                    src="/icons/password-gray.svg"
                    width={20}
                    height={20}
                    alt="password-gray.svg"
                  ></Image>
                  <input
                    className="w-full font-work-sans text-black outline-none placeholder:text-black placeholder:capitalize"
                    type="password"
                    placeholder="confirm password"
                    minLength={8}
                    maxLength={64}
                    {...register("confirmPassword", {
                      required: "Confirm your password!",
                      validate: {
                        matchPassword: (confirmPassword) =>
                          confirmPassword === getValues("password") ||
                          "Passwords do not match",
                      },
                    })}
                  />
                </label>
              </div>
              <button className="w-full py-[12px] md:max-w-[330px] mt-[30px] button-primary before:hidden">
                {loading ? "Creating..." : "create account"}
              </button>
              <ul className="mt-[15px] px-[20px] flex flex-col gap-y-[2px] list-disc list-inside">
                {allErrors.map((error, i) => {
                  return (
                    <li
                      className="p-sans text-[14px] text-rose-500"
                      key={i}
                    >
                      {error}
                    </li>
                  )
                })}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
