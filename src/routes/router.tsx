import MainLayout from "@/components/layout/MainLayout";
import About from "@/pages/about/About";
import AdminsDashboard from "@/pages/adminDashboard/AdminsDashboard";

import AllProduct from "@/pages/allProducts/AllProduct";
import Cart from "@/pages/cart/Cart";
import CartPage from "@/pages/cart/CartPage";
import CheckOut from "@/pages/checkout/CheckOut";
import ContactUs from "@/pages/contact/Contact";
import Dashboard from "@/pages/dashboard/Dashboard";
import FeaturedProduct from "@/pages/featuredProduct/FeaturedProduct";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import ManageProduct from "@/pages/manageProduct/ManageProduct";
import Register from "@/pages/Register/Register";
import SuccessPage from "@/pages/successPage/SuccessPage";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute";
import AdminDashboardPage from "@/pages/adminDashboard/AdminDashboardPage";  // Placeholder for actual admin page components
import ProductsPage from "@/pages/adminDashboard/ProductsPage";

import SettingsPage from "@/pages/adminDashboard/SettingsPage";
import UserMangement from "@/pages/adminDashboard/UserMangement";
import OrdersPage from "@/pages/adminDashboard/OrdersPage";
import Profle from "@/pages/dashboard/Profile";
import Order from "@/pages/dashboard/Order";
import DashboardOverview from "@/pages/dashboard/DashboardOverview";
import Notification from "@/pages/dashboard/Notification";




const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/all-product",
                element: <AllProduct />,
            },
            {
                path: "/all-products/:id",
                element: <AllProduct />,
            },
            {
                path: "/feature",
                element: <FeaturedProduct />
            },
            {
                path: "/manage-product",
                element: <ProtectedRoute allowedRoles={["admin"]}><ManageProduct /></ProtectedRoute>,
            },
            {
                path: "/cart/:id",
                element: <Cart />,
            },
            {
                path: "/checkout",
                element: <CheckOut />,
            },
            {
                path: "/cartpage",
                element: <ProtectedRoute allowedRoles={["user", "admin"]}><CartPage /></ProtectedRoute>,
            },
            {
                path: "/success",
                element: <SuccessPage />,
            },
            {
                path: "/contact",
                element: <ContactUs />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute allowedRoles={["user"]}><Dashboard /></ProtectedRoute>,
        children: [
            {
                index: true,
                element: <DashboardOverview />,
            },
            {
                path: "dashboard-overview",
                element: <DashboardOverview />,
            },
            {
                path: "profile",
                element: <Profle />,
            },
            {
                path: "order",
                element: <Order />,
            },
            {
                path: "notifications",
                element: <Notification />,
            }
        ]
    },
    {
        path: "/admin-dashboard",
        element: <ProtectedRoute allowedRoles={["admin"]}><AdminsDashboard /></ProtectedRoute>,
        children: [
            {
                index: true,
                element: <AdminDashboardPage />, // Admin Dashboard Overview Page
            },
            {
                path: "dashboard",
                element: <AdminDashboardPage />, // Admin Dashboard Overview Page
            },
            {
                path: "users",
                element: <UserMangement />
            },
            {
                path: "products",
                element: <ProductsPage />, // Admin Products Management Page
            },
            {
                path: "orders",
                element: <OrdersPage />, // Admin Orders Page
            },
            {
                path: "settings",
                element: <SettingsPage />, // Admin Settings Page
            },
        ]
    }
]);

export default router;
