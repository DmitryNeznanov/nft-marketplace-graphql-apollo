const errorMessages: Record<string, string> = {
  USERNAME_EXISTS: "Username already exist.",
  EMAIL_EXISTS: "Email already exist.",
  UNKNOWN: "Unkwnown error.",
  MULTIPLE_CONFLICTS: "Multiple issues",
}

export function getGraphQLErrorMessage(error: any): string {
  const issues = error?.graphQLErrors?.[0]?.extensions?.issues

  if (Array.isArray(issues)) {
    const messages = issues.map((code: string) => errorMessages[code])
    return messages.join("\n")
  }

  const code = error?.graphQLErrors?.[0]?.extensions?.code
  return errorMessages[code] || errorMessages.UNKNOWN
}
