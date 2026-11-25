import { createContext, useContext } from "react"
import type { AuthResponse } from "@/api/auth"

export type CustomerUser = AuthResponse["data"]["user"]

type CustomerAuthContextValue = {
  user: CustomerUser | null
  signIn: (user: CustomerUser, accessToken: string) => void
  signOut: () => void
}

export const CustomerAuthContext = createContext<CustomerAuthContextValue | null>(null)

export function useCustomerAuth() {
  const context = useContext(CustomerAuthContext)
  if (!context) {
    throw new Error("useCustomerAuth must be used within CustomerAuthProvider.")
  }
  return context
}
