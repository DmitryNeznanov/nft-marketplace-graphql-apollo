"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { useQuery } from "@apollo/client"
import { ME } from "@/graphql/client/auth/me"
import apolloClient from "@/lib/apolloClient"

interface AccountType {
  id: string
  username: string
  email: string
}

interface MeContextType {
  account: AccountType | null
  loading: boolean
  setAccount: (acc: AccountType | null) => void
  login: (acc: AccountType) => void
  logout: () => void
}

const MeContext = createContext<MeContextType>({
  account: null,
  loading: true,
  setAccount: () => {},
  login: () => {},
  logout: () => {},
})

export function MeProvider({ children }: { children: ReactNode }) {
  const { data, loading: queryLoading } = useQuery(ME, {
    fetchPolicy: "cache-and-network",
  })

  const [account, setAccount] = useState<AccountType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (queryLoading) {
      setLoading(true)
    } else {
      setAccount(data?.me || null)
      setLoading(false)
    }
  }, [data, queryLoading])

  function login(acc: AccountType) {
    setAccount(acc)
  }

  function logout() {
    setAccount(null)
    apolloClient.clearStore()
  }

  return (
    <MeContext.Provider value={{ account, loading, setAccount, login, logout }}>
      {children}
    </MeContext.Provider>
  )
}

export const useMe = () => useContext(MeContext)
