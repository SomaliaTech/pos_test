import {
  createBrowserRouter,
  Navigate,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";

import Menu from "./pages/home/HomePage";
import UserderDashboad from "./pages/dashboard/UserDashboard";
import AdminPage from "./pages/admin/page";
import AllUsersPage from "./pages/admin/dashboard/AllUsersPage";
import UserAnalyticsPage from "./pages/admin/userAnalytics";
import OrderPage from "./pages/oders-table/OrderPage";
import Dishespage from "./pages/admin/dashboard/dishes/dishespage";
import TableAdminDashboard from "./pages/admin/dashboard/tables";
import OrderHistory from "./pages/dashboard/order-history/OrderHistory";
import TablesMenagement from "./pages/tables/TableManagement";
import OrderManagement from "./pages/order/OrderManagement";
import OrderDetails from "./pages/order/OrderDetials";
import TableDetailsPage from "./pages/tables/TableDetailsPage";
import MenuMobile from "./pages/mobile/Menu_mobile";
import WelcomePage from "./pages/mobile/WelcomePage";
import MessageContect from "./pages/mobile/MessageContect";
import ProtectedRoute from "./hooks/ProtectedRoute";

import AdminProtected from "./hooks/AdminProtected";
import Auth from "./pages/auth/auth";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserderDashboad />} />
        <Route path="menu" element={<Menu />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="tables" element={<TablesMenagement />} />
        <Route path="orders-management" element={<OrderManagement />} />
        <Route path="orders-details/:id" element={<OrderDetails />} />
        <Route path="table-details/:id" element={<TableDetailsPage />} />
        <Route path="order-history" element={<OrderHistory />} />

        {/* Admin Routes */}
        <Route
          path="admin"
          element={
            <AdminProtected>
              <Outlet />
            </AdminProtected>
          }
        >
          <Route index element={<AdminPage />} />
          <Route path="create-dishes" element={<Dishespage />} />
          <Route path="all-users" element={<AllUsersPage />} />
          <Route path="table" element={<TableAdminDashboard />} />
          <Route path="user-analytics" element={<UserAnalyticsPage />} />
        </Route>
      </Route>
      <Route path="/welcome/:id" element={<WelcomePage />} />
      <Route path="/message" element={<MessageContect />} />
      <Route path="/mobile-menu" element={<MenuMobile />} />
      <Route path="/login" element={<Auth />} />
      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </>
  )
);

export default router;
