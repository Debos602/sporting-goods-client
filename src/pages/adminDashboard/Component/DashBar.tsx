import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { TUser } from "@/types/Global";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "@/redux/authSlice";
import { AiOutlineHome } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { useGetUserOrderQuery } from "@/redux/api/baseApi";

const DashBar = () => {
    const user = useAppSelector((state) => state.auth.user) as TUser | null;
    console.log(user);

    // Use userId directly or an empty string if user is not available
    const { data: userOrder } = useGetUserOrderQuery(user?._id || '');  // Passing user?.id directly
    console.log(userOrder);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/");
    };

    // Extract product names for notifications
    const notifications = userOrder?.data?.flatMap(order =>
        order.items.map(item => item.name)
    ) || [];

    return (
        <div className="container mx-auto">
            <div className='bg-gray-100 text-amber-950 border-b text-2xl border-amber-950 py-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-amber-50'>
                <h1>Dashboard</h1>
                <DropdownMenu>
                    {user ? (
                        <>
                            <div className="flex items-center justify-center gap-5">
                                {/* Notification Dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="relative cursor-pointer">
                                            <FaBell className="text-2xl text-gray-700 hover:text-blue-500" />
                                            {(notifications.length > 0) && (
                                                <span className="absolute bottom-4  left-3 bg-red-500 text-white text-xs rounded-full px-1.5">
                                                    {notifications.length}
                                                </span>
                                            )}
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-white shadow-xl border-0 py-2 w-64 mt-5">
                                        {notifications.length > 0 ? (
                                            notifications.map((productName, index) => (
                                                <DropdownMenuItem key={index} className="hover:bg-gray-100 text-sm text-amber-950 px-4 py-2">
                                                    <span>You have a new  order {productName}</span>
                                                </DropdownMenuItem>
                                            ))
                                        ) : (
                                            <DropdownMenuItem className="text-center text-gray-500 text-sm px-4 py-2">
                                                No notifications
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* User Avatar Dropdown */}
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src="https://i.ibb.co/grvH19N/468063584-3886629091578658-8295155366060814102-n.jpg" alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                            </div>
                            <DropdownMenuContent className="bg-amber-50 shadow-xl border-0 py-4">
                                <DropdownMenuItem className="hover:bg-amber-200">
                                    <AiOutlineHome className="mr-2" />
                                    <Link className="text-base font-semibold" to="/">Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-amber-200">
                                    <MdDashboard className="mr-2" />
                                    {user?.role === "admin" ? (
                                        <Link to="/admin-dashboard" className="text-base font-semibold"> Dashboard</Link>
                                    ) : (
                                        user?.role === "user" && <Link to="/dashboard" className="text-base font-semibold">User Dashboard</Link>
                                    )}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-amber-200">
                                    <FiLogOut className="mr-2" />
                                    <Link to="/login" className="text-base font-semibold" onClick={handleLogout}>Logout</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </>
                    ) : (
                        <DropdownMenuTrigger>
                            <Link to="/login" className="border-2 hover:bg-amber-50 hover:text-amber-950 duration-700 px-4 py-2 flex items-center">
                                <FiLogIn className="mr-2" /> Login
                            </Link>
                        </DropdownMenuTrigger>
                    )}
                </DropdownMenu>
            </div>
        </div>
    );
};

export default DashBar;
