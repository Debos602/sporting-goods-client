import { useState } from "react";
import { FaTachometerAlt, FaShoppingCart, FaTasks, FaChartLine, FaBell, FaComments, FaQuestionCircle, FaUser, FaBox, FaCog } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { TUser } from "@/types";
import { useAppSelector } from "@/redux/hooks";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
    const user = useAppSelector((state) => state.auth.user) as TUser | null;

    const [activeRoute, setActiveRoute] = useState("dashboard");
    const navigate = useNavigate();

    // Function to handle route change
    const handleRouteChange = (route: string) => {
        setActiveRoute(route); // Update active route
        navigate(`/dashboard/${route}`); // Navigate to the selected route
    };

    // Function to determine the active class
    const getLinkClasses = (route: string) => {
        const baseClasses =
            "flex items-center py-3 px-2 my-2 space-x-4 rounded cursor-pointer transition-colors";
        const activeClasses = route === activeRoute ? "bg-amber-950 text-white" : "hover:bg-amber-950 hover:text-white";

        return `${baseClasses} ${activeClasses}`;
    };

    return (
        <div className="bg-gray-100 text-amber-950 min-h-screen  text-base fixed w-16 md:w-64 border-r border-amber-950 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
            <div className="flex items-center justify-center h-16 md:h-24  bg-opacity-80 bg-black">
                <Link to="/admin-dashboard/dashboard" className="flex items-center">
                    <img src={logo} className="p-2 h-16 max-h-full md:h-24  w-full" alt="Logo" />
                </Link>
            </div>
            {user?.role === "admin" ? (
                <ul className="flex flex-col mt-5 text-xl mx-1 md:px-4">
                    <Link
                        onClick={() => handleRouteChange("dashboard")}
                        to="/admin-dashboard/dashboard"
                        className={getLinkClasses("dashboard")}
                    >
                        <FaTachometerAlt />
                        <span className="hidden md:inline text-sm">Dashboard</span>
                    </Link>
                    <Link
                        onClick={() => handleRouteChange("orders")}
                        to="/admin-dashboard/orders"
                        className={getLinkClasses("orders")}
                    >
                        <FaShoppingCart />
                        <span className="hidden md:inline text-sm">Orders</span>
                    </Link>
                    <Link
                        onClick={() => handleRouteChange("users")}
                        to="/admin-dashboard/users"
                        className={getLinkClasses("users")}
                    >
                        <FaUser />
                        <span className="hidden md:inline">Users</span>
                    </Link>
                    <Link
                        onClick={() => handleRouteChange("products")}
                        to="/admin-dashboard/products"
                        className={getLinkClasses("products")}
                    >
                        <FaBox />
                        <span className="hidden md:inline">Products</span>
                    </Link>
                    <Link
                        onClick={() => handleRouteChange("settings")}
                        to="/admin-dashboard/settings"
                        className={getLinkClasses("settings")}
                    >
                        <FaCog />
                        <span className="hidden md:inline">Settings</span>
                    </Link>
                </ul>
            ) : <ul className="flex flex-col mt-5 mx-1 md:px-4 text-xl">
                {/* Dashboard */}
                <Link
                    onClick={() => handleRouteChange("dashboard")}
                    to="/dashboard/dashboard-overview"
                    className={getLinkClasses("dashboard")}
                >
                    <FaTachometerAlt />
                    <span className="hidden md:inline text-sm">Dashboard (Home)</span>
                </Link>

                {/* Profile */}
                <Link
                    onClick={() => handleRouteChange("profile")}
                    to="/dashboard/profile"
                    className={getLinkClasses("profile")}
                >
                    <CgProfile />
                    <span className="hidden md:inline text-sm">Profile/Account Settings</span>
                </Link>

                {/* Notifications */}
                <Link
                    onClick={() => handleRouteChange("notifications")}
                    to="/dashboard/notifications"
                    className={getLinkClasses("notifications")}
                >
                    <FaBell />
                    <span className="hidden md:inline text-sm">Notifications</span>
                </Link>

                {/* Messages/Chats */}
                <Link
                    onClick={() => handleRouteChange("messages")}
                    to="/dashboard/messages"
                    className={getLinkClasses("messages")}
                >
                    <FaComments />
                    <span className="hidden md:inline text-sm">Messages/Chats</span>
                </Link>

                {/* Tasks/Projects */}
                <Link
                    onClick={() => handleRouteChange("tasks")}
                    to="/dashboard/tasks"
                    className={getLinkClasses("tasks")}
                >
                    <FaTasks />
                    <span className="hidden md:inline text-sm">Tasks/Projects</span>
                </Link>

                {/* Reports/Analytics */}
                <Link
                    onClick={() => handleRouteChange("reports")}
                    to="/dashboard/reports"
                    className={getLinkClasses("reports")}
                >
                    <FaChartLine />
                    <span className="hidden md:inline text-sm">Reports/Analytics</span>
                </Link>

                {/* Support/Help */}
                <Link
                    onClick={() => handleRouteChange("support")}
                    to="/dashboard/support"
                    className={getLinkClasses("support")}
                >
                    <FaQuestionCircle />
                    <span className="hidden md:inline text-sm">Support/Help</span>
                </Link>
            </ul>

            }

        </div>
    );
};

export default Sidebar;
