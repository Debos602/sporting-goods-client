import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/images/logo.png";
import { FaCartArrowDown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { selectCartCount } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/Global";
import { logout } from "@/redux/authSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AiOutlineHome } from "react-icons/ai"; // Home icon
import { MdDashboard } from "react-icons/md"; // Dashboard icon
import { FiLogOut } from "react-icons/fi"; // Logout and Login icons

/**
 * Navbar Component
 *
 * This component renders a navigation bar with a logo and navigation links.
 * It uses components from the `shadcn/ui` library for the navigation menu.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Navbar = () => {
    const user = useAppSelector((state) => state.auth.user) as TUser | null;
    console.log(user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const cartCount = useSelector((state: RootState) => selectCartCount(state));

    const handleNavigatetoCart = () => {
        navigate("/cartpage");
    };
    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(logout());
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigationLinks = (
        <>
            <NavigationMenuItem className="p-2">
                <NavigationMenuLink asChild>
                    <Link
                        to="/"
                        className={`${navigationMenuTriggerStyle}  ml-[4px] font-bold text-xl hover:border-b-2 border-white`}
                    >
                        Home
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="p-2">
                <NavigationMenuLink asChild>
                    <Link
                        to="/all-product"
                        className={`${navigationMenuTriggerStyle}  font-bold text-xl hover:border-b-2 border-white`}
                    >
                        All-products
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="p-2">
                <NavigationMenuLink asChild>
                    <Link
                        to="/about"
                        className={`${navigationMenuTriggerStyle} m-0  font-bold text-xl hover:border-b-2 border-white`}
                    >
                        About Us
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="p-2">
                <NavigationMenuLink asChild>
                    {
                        user?.role === "admin" ? (<Link
                            to="/manage-product"
                            className={`${navigationMenuTriggerStyle} m-0  font-bold text-xl hover:border-b-2 border-white`}
                        >
                            Manage-product
                        </Link>) : null
                    }
                </NavigationMenuLink>
            </NavigationMenuItem>
        </>
    );
    //   bg-transparent
    return (
        <div className="border-b-2 bg-amber-950 bg-opacity-90 fixed top-0 left-0 w-full z-40 px-5  py-1 md:px-5 xl:px-0">
            <div className="flex justify-between items-center max-w-screen-xl mx-auto py-2">
                {/* Hamburger Menu Icon for Mobile */}
                <div className="flex gap-3">
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white">
                            {isMenuOpen ? (
                                <FiX className="border-2 border-amber-50 rounded-full" size={30} />
                            ) : (
                                <FiMenu size={30} />
                            )}
                        </button>
                    </div>
                    {/* Logo and Home link */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="object-cover h-full max-h-16" alt="Logo" />
                    </Link>
                </div>

                {/* Navigation Menu for Desktop */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="flex justify-end text-amber-50 font-['Open_Sans'] ml-10">
                        {navigationLinks}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="text-amber-50 w-[200px]">
                    <div className="flex justify-center items-center w-full gap-4">
                        <div className="relative flex flex-col justify-center items-center">
                            <FaCartArrowDown
                                className="text-amber-50 text-xl cursor-pointer"
                                onClick={handleNavigatetoCart}
                            />
                            {cartCount > 0 && (
                                <span className=" animate-ping absolute -top-3 right-[5px] bg-gray-950 text-white rounded-full px-2 py-1 text-xs">
                                    {cartCount}
                                </span>
                            )}
                            <div onClick={handleNavigatetoCart} className="text-white text-lg font-md cursor-pointer">
                                My Store
                            </div>
                        </div>

                        <div className="text-xl ">
                            <DropdownMenu>
                                {
                                    user ? (
                                        <>
                                            <DropdownMenuTrigger>
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

                                            <Link to="/login" className="border-2 hover:bg-amber-50 hover:text-amber-950 duration-700 px-4 py-2 ">Login</Link>
                                        </DropdownMenuTrigger>
                                    )
                                }
                            </DropdownMenu>


                        </div>
                    </div>



                </div>
            </div>

            {/* Navigation Menu for Mobile */}
            {
                isMenuOpen && (
                    <div className="lg:hidden bg-gradient-to-t from-amber-950 to-amber-700 w-full">
                        <NavigationMenu className="uppercase">
                            <NavigationMenuList className="flex flex-col items-start text-white font-['Open_Sans'] p-4">
                                {navigationLinks}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                )
            }
        </div >
    );
};

export default Navbar;
