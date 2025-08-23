"use client"
import Image from "next/image"
import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { SIGNIN } from "@/graphql/client/auth/signin"
import { useRouter } from "next/navigation"
import { ME } from "@/graphql/client/auth/me"

type FormData = {
  email: string
  password: string
}
export default function SigninContent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ criteriaMode: "all", reValidateMode: "onSubmit" })

  const [signin, { loading, error }] = useMutation(SIGNIN, {
    context: { fetchOptions: { credentials: "include" } },
    refetchQueries: [{ query: ME }],
  })

  const formErrors = Object.values(errors).map((err) => err?.message || "")
  const gqlErrors = error?.graphQLErrors?.map((err) => err.message) || []
  const allErrors = [...formErrors, ...gqlErrors]

  const router = useRouter()

  async function onSubmit(data: FormData) {
    try {
      const response = await signin({
        variables: {
          email: data.email,
          password: data.password,
        },
      })

      const account = response.data?.signin?.account
      if (!account) throw new Error("User not found")
      const tokenSet = response.data?.signin?.tokenSet

      console.log("User signed in:", account)
      console.log("Token set successfully:", tokenSet)
      alert(`You have signed in successfully!`)
      router.push("/")
    } catch (err) {
      console.error("Sign-in failed:", err)
    }
  }
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:gap-x-[40px] lg:gap-x-[60px]">
        <div className="md:max-w-[50%]">
          <Image
            className="w-screen h-screen max-h-[232px] md:max-h-[615px] lg:max-h-[691px]"
            src="/signin.png"
            width={610}
            height={691}
            alt="signin.png"
          ></Image>
        </div>
        <div className="max-w-sm mx-auto md:mx-0 md:max-w-[50%]">
          <div className="pt-[30px] pb-[40px] md:pt-0 md:pb-0 flex flex-col">
            <article className="max-w-[460px]">
              <h2 className="h2-sans">Login Account</h2>
              <p className="mt-[20px] p-sans-xl capitalize">
                Enter your Email and password to login in account
              </p>
            </article>
            <form
              className="mt-[30px] lg:mt-[40px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="md:max-w-[330px] flex flex-col gap-y-[15px]">
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
                    {...register("email", {
                      required: "Email is required!",
                      minLength: {
                        value: 6,
                        message: "Email must be at most 6 characters",
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
                <label className="w-full py-[12px]  flex flex-row gap-x-[12px] input-primary">
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
              <button className="w-full py-[12px] md:max-w-[330px] mt-[30px] button-primary before:hidden">
                {loading ? "signin..." : "Sign In"}
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
        </div>
      </div>
    </section>
  )
}
