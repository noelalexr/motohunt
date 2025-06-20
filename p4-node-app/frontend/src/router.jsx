import { createBrowserRouter, Navigate, redirect } from "react-router";

//PAGES
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import GuestDashboard from "./pages/GuestDashboard.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import UploadProfilePhoto from "./pages/UploadProfilePhoto.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import EditProduct from "./pages/EditProduct.jsx";

async function checkAuth() {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
            method: "GET",
            credentials: "include",
        });
        if (!res.ok) {
            throw new Error("Not authenticated");
        }
        return null;
    } catch {
        return redirect("/login");
    }
}


const router = createBrowserRouter([
    {
        path: "/",
        loader: async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
                    method: "GET",
                    credentials: "include",
                });
                if (res.ok) {
                    return redirect("/dashboard"); //IF LOGGED IN - REDIRECT TO DASHBOARD
                }
                return redirect("/login");
            } catch {
                return redirect("/login");
            }
        },
        element: <Navigate to="/login" />,
        HydrateFallback: <div>Loading Root Route...</div>
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/guest-dashboard",
        element: <GuestDashboard />,
    },
    {
        path: "/dashboard",
        loader: checkAuth,
        element: <Dashboard />,
    },
    {
        path: "/products/:id",
        loader: checkAuth,
        element: <ProductDetails />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/profile",
        loader: checkAuth,
        element: <Profile />,
    },
    {
        path: "/profile/upload-photo",
        loader: checkAuth,
        element: <UploadProfilePhoto />,
    },
    {
        path: "/wishlist",
        loader: checkAuth,
        element: <Wishlist />,
    },
    {
        path: "/add-product",
        loader: checkAuth,
        element: <AddProduct />,
    },
    {
        path: "/edit-product/:id",
        loader: checkAuth,
        element: <EditProduct />,
    },
]);

export default router;