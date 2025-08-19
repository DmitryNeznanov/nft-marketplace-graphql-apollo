// graphql/resolvers/auth/logout.ts
import dbConnect from "@/lib/mongoose"
import Token from "@/app/models/Token"
import serializeClearTokenCookie from "@/lib/cookies/serializeClearTokenCookie"

export async function logout(_: unknown, __: unknown, context: ServerContext) {
  await dbConnect()

  if (context.user?.token) {
    await Token.deleteOne({ token: context.user.token }).catch(() => {})
  }

  context.setCookies.push(serializeClearTokenCookie())

  return { success: true }
}
