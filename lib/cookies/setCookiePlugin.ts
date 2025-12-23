// lib/apolloPlugins.ts
import { ApolloServerPlugin } from "@apollo/server"

export function setCookiePlugin(): ApolloServerPlugin<ServerContext> {
  return {
    async requestDidStart() {
      return {
        async willSendResponse(ctx) {
          const cookies = ctx.contextValue.setCookies
          if (cookies?.length) {
            ctx.response.http!.headers.set("Set-Cookie", cookies.join(", "))
          }
        },
      }
    },
  }
}
