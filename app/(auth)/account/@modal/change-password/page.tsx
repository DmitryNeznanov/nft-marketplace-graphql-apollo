"use client"

import { useRouter } from "next/navigation"
import Modal from "../../components/Modal"
import { UPDATE_PASSWORD } from "@/graphql/client/account/updatePassword"
import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { ME } from "@/graphql/client/auth/me"

type FormData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePasswordModel() {
  const router = useRouter()
  const [changePassword, { loading, error }] = useMutation(UPDATE_PASSWORD, {
    fetchPolicy: "no-cache",
    refetchQueries: [{ query: ME }],
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>({ criteriaMode: "all", reValidateMode: "onSubmit" })

  async function onSubmit(data: FormData) {
    const response = await changePassword({
      variables: {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
    })
    if (!response.data?.updatePassword?.success) {
      throw new Error("Password update failed. Please try again.")
    }
    alert("Password updated successfully. You can close this modal.")
    router.back()
  }

  const allErrors = [
    ...Object.values(errors).map((e) => e?.message || ""),
    ...(error?.graphQLErrors.map((e) => e.message) || []),
  ]

  return (
    <Modal>
      <article>
        <h2 className="h2-sans">Change password</h2>
        <p className="p-sans">Enter and confirm your new password</p>
      </article>

      <form
        className="mt-[25px] flex flex-col gap-y-[30px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-y-5">
          <div>
            <label
              htmlFor="oldPassword"
              className="p-sans font-medium"
            >
              Old password:
            </label>
            <input
              className="w-full mt-[2px] input-primary"
              id="oldPassword"
              placeholder="Old password"
              type="password"
              {...register("oldPassword", {
                required: "Old password is required!",
              })}
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="p-sans font-medium"
            >
              New password:
            </label>
            <input
              className="w-full mt-[2px] input-primary"
              id="newPassword"
              placeholder="New password"
              type="password"
              {...register("newPassword", {
                required: "New password is required!",
                minLength: {
                  value: 8,
                  message: "New password must be at least 8 characters",
                },
                maxLength: {
                  value: 64,
                  message: "New password must be at most 64 characters",
                },
                pattern: {
                  value: /[A-Za-z]/,
                  message: "New password must contain at least one letter",
                },
                validate: {
                  safeCharacters: (v) =>
                    /^[A-Za-z\d@$!%*?&]+$/.test(v) ||
                    "New password contains invalid characters",
                },
              })}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="p-sans font-medium"
            >
              Confirm new password:
            </label>
            <input
              className="w-full mt-[2px] input-primary"
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              minLength={8}
              maxLength={64}
              {...register("confirmPassword", {
                required: "Confirm your password!",
                validate: {
                  matchPassword: (confirmPassword) =>
                    confirmPassword === getValues("newPassword") ||
                    "Passwords do not match",
                },
              })}
            />
          </div>
          <ul className="mt-[5px] flex flex-col gap-y-[2px] list-disc list-outside">
            {allErrors.map((error, i) => (
              <li
                key={i}
                className="p-sans text-[14px] text-rose-500"
              >
                {error}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between">
          <button
            className="button-transparent before:hidden"
            type="button"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <button
            className="button-primary before:hidden"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
