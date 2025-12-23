"use client"

import { useRouter } from "next/navigation"
import Modal from "../../components/Modal"
import { UPDATE_USERNAME } from "@/graphql/client/account/updateUsername"
import { useMutation } from "@apollo/client"
import { useForm } from "react-hook-form"
import { ME } from "@/graphql/client/auth/me"
type FormData = {
  username: string
}

export default function ChangeUsernameModal() {
  const router = useRouter()
  const [changeUsername, { loading: changingUsername, error }] = useMutation(
    UPDATE_USERNAME,
    {
      fetchPolicy: "no-cache",
      refetchQueries: [{ query: ME }],
    }
  )
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ criteriaMode: "all", reValidateMode: "onSubmit" })

  async function onSubmit(data: FormData) {
    const response = await changeUsername({
      variables: { username: data.username },
    })
    const updatedUsername = response.data?.updateUsername?.username

    if (!updatedUsername) throw new Error("Username update failed")
    alert(
      `Username updated successfully to: \n\ ${JSON.stringify(
        updatedUsername
      )}. \n\ You can close this modal.`
    )
    router.back()
  }
  const allErrors = [
    ...Object.values(errors).map((e) => e?.message || ""),
    ...(error?.graphQLErrors.map((e) => e.message) || []),
  ]
  return (
    <Modal>
      <h2 className="h2-sans">Change username</h2>
      <p className="mt-[25px] p-sans">Enter your new username below:</p>
      <form
        className="mt-[3px] flex flex-col gap-y-[30px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className="w-full input-primary"
            placeholder="Enter new username"
            autoFocus
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
          <ul className="mt-[5px] flex flex-col gap-y-[2px] list-disc list-outside">
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
            disabled={changingUsername}
          >
            {changingUsername ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </Modal>
  )
}
