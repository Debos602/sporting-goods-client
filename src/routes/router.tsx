import MainLayout from "@/components/layout/MainLayout";
import About from "@/pages/about/About";
import AllProduct from "@/pages/allProducts/AllProduct";
import Cart from "@/pages/cart/Cart";
import CheckOut from "@/pages/checkout/CheckOut";
import Home from "@/pages/Home/Home";
import ManageProduct from "@/pages/manageProduct/ManageProduct";
import SingleProduct from "@/pages/single-product/SingleProduct";
import { createBrowserRouter } from "react-router-dom";

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
                path: "/all-products",
                element: <AllProduct />,
            },
            {
                path: "/category/:id",
                element: <SingleProduct />,
            },
            {
                path: "/manage-product",
                element: <ManageProduct />,
            },
            {
                path: "/cart/:id",
                element: <Cart />,
            },
            {
                path: "/checkout",
                element: <CheckOut />,
            },
            // {
            //     path: "/cartpage",
            //     element:
            // }
        ],
    },
]);
export default router;
