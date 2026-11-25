import { createBrowserRouter, Outlet } from "react-router-dom"
import AdminLayout from "@/components/layout/admin/layout"
import AuthLayout from "@/components/layout/auth/layout"
import CustomerLayout from "@/components/layout/customer/layout"
import DashboardPage from "@/pages/admin/dashboard"
import GroomingPage from "@/pages/admin/grooming"
import InventoryPage from "@/pages/admin/inventory"
import ProductsPage from "@/pages/admin/products"
import ReportsPage from "@/pages/admin/reports"
import AdminSignInPage from "@/pages/admin/login"
import StaffPage from "@/pages/admin/staff"
import TransactionDetailPage from "@/pages/admin/transaction-detail"
import TransactionsPage from "@/pages/admin/transactions"
import AccountOverviewPage from "@/pages/customer/account-overview"
import CartCheckoutPage from "@/pages/customer/cart-checkout"
import CustomerGroomingPage from "@/pages/customer/grooming-booking"
import HomePage from "@/pages/customer/home"
import OrderTrackingPage from "@/pages/customer/order-tracking"
import PetProfilePage from "@/pages/customer/pet-profile"
import ProductDetailPage from "@/pages/customer/product-detail"
import RecommendationResultPage from "@/pages/customer/recommendation-result"
import SearchCategoryListingPage from "@/pages/customer/search-category-listing"
import CustomerRegisterPage from "@/pages/customer/auth/register"
import CustomerLoginPage from "@/pages/customer/auth/login"
import SubscriptionManagementPage from "@/pages/customer/subscription-management"

export const router = createBrowserRouter([
  {
    element: (
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    ),
    children: [
      { path: "admin/login", element: <AdminSignInPage /> },
      { path: "login", element: <CustomerLoginPage /> },
      { path: "register", element: <CustomerRegisterPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "transactions", element: <TransactionsPage /> },
      { path: "transactions/:transactionId", element: <TransactionDetailPage /> },
      { path: "transactions/:transactionId/change-state", element: <TransactionDetailPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "grooming", element: <GroomingPage /> },
      { path: "staff", element: <StaffPage /> },
      { path: "*", element: <div>Trang admin không tồn tại</div> },
    ],
  },
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <SearchCategoryListingPage /> },
      { path: "shop/:categorySlug", element: <SearchCategoryListingPage /> },
      { path: "shop/:categorySlug/:productId", element: <ProductDetailPage /> },
      { path: "pet-profile", element: <PetProfilePage /> },
      { path: "pet-profile/recommendations", element: <RecommendationResultPage /> },
      { path: "products/:productId", element: <ProductDetailPage /> },
      { path: "cart", element: <CartCheckoutPage /> },
      { path: "account/subscriptions", element: <SubscriptionManagementPage /> },
      { path: "account/orders/:orderId", element: <OrderTrackingPage /> },
      { path: "grooming", element: <CustomerGroomingPage /> },
      { path: "account", element: <AccountOverviewPage /> },
      { path: "*", element: <div>Trang khách hàng không tồn tại</div> },
    ],
  },
])
