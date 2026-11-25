import { RouterProvider } from "react-router-dom"
import { CustomerAuthProvider } from "@/components/common/customer-auth-provider"
import ThemeProvider from "@/components/common/theme-provider"
import { router } from "@/routes"

export default function App() {
  return (
    <ThemeProvider>
      <CustomerAuthProvider>
        <RouterProvider router={router} />
      </CustomerAuthProvider>
    </ThemeProvider>
  )
}