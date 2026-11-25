import { useState, type ReactNode } from "react"
import { CustomerAuthContext, type CustomerUser } from "@/components/common/customer-auth-context"

const storageKey = "senbox.customer.user"

function isCustomerUser(value: unknown): value is CustomerUser {
  if (typeof value !== "object" || value === null) {
    return false
  }

  const user = value as Record<string, unknown>
  return (
    typeof user.id === "string" &&
    typeof user.name === "string" &&
    typeof user.email === "string" &&
    user.role === "customer"
  )
}

function getStoredUser(): CustomerUser | null {
  const storedUser = localStorage.getItem(storageKey)
  if (!storedUser) {
    return null
  }

  try {
    const parsedUser: unknown = JSON.parse(storedUser)
    if (isCustomerUser(parsedUser)) {
      return parsedUser
    }
  } catch (error) {
    console.error("Could not parse the saved customer session.", error)
  }

  localStorage.removeItem(storageKey)
  return null
}

type CustomerAuthProviderProps = {
  children: ReactNode
}

export function CustomerAuthProvider({ children }: CustomerAuthProviderProps) {
  const [user, setUser] = useState<CustomerUser | null>(getStoredUser)

  function signIn(nextUser: CustomerUser, accessToken: string) {
    localStorage.setItem(storageKey, JSON.stringify(nextUser))
    localStorage.setItem("accessToken", accessToken)
    setUser(nextUser)
  }

  function signOut() {
    localStorage.removeItem(storageKey)
    localStorage.removeItem("accessToken")
    setUser(null)
  }

  return (
    <CustomerAuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </CustomerAuthContext.Provider>
  )
}
