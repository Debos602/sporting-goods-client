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
import { AiOutlineHome } from "react-icons/ai"; // Home icon
import { MdDashboard } from "react-icons/md"; // Dashboard icon
import { FiLogOut, FiLogIn } from "react-icons/fi"; // Logout and Login icons

const DashBar = () => {
    const user = useAppSelector((state) => state.auth.user) as TUser | null;
    console.log(user);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="container mx-auto">
            <div className='bg-gray-100 text-amber-950 border-b text-2xl border-amber-950 py-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-amber-50'>
                <h1 >Dashboard</h1>
                <DropdownMenu>
                    {user ? (
                        <>
                            <DropdownMenuTrigger className="flex items-start justify-end gap-5">
                                <div className="flex flex-col justify-start">
                                    <p className="text-sm text-start font-semibold">{user.name}</p>
                                    <p className="text-xs font-semibold">{user.email}</p>
                                </div>
                                <Avatar>
                                    <AvatarImage src="https://i.ibb.co/grvH19N/468063584-3886629091578658-8295155366060814102-n.jpg" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-amber-50 shadow-xl border-0 py-4 ">
                                <DropdownMenuItem className="hover:bg-amber-200">
                                    <AiOutlineHome className="mr-2" />
                                    <Link className="text-base font-semibold " to="/">Home</Link>
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
