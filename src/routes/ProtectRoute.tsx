import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verifyToken } from "@/utilities/verifyToken";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken } from "@/redux/authSlice";

type TUser = {
    role: "admin" | "user";
};

type TProtectedRoute = {
    children: ReactNode;
    allowedRoles: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: TProtectedRoute) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(useCurrentToken);
    const location = useLocation(); // Capture current location to redirect users after login
    let user: TUser | null = null;

    if (token) {
        try {
            user = verifyToken(token) as TUser;
        } catch (error) {
            // If token verification fails (e.g., expired or tampered token)
            toast.error("Session expired. Please log in again.");
            dispatch(logout());
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    }

    // If there's no token, log out and navigate to login
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If the user's role doesn't match any of the allowed roles, redirect to an unauthorized page
    if (user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // If everything is valid, render the children components
    return <>{children}</>;
};

export default ProtectedRoute;