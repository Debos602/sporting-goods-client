import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/images/logo.png";
import { FaCartArrowDown } from "react-icons/fa6";

/**
 * Navbar Component
 *
 * This component renders a navigation bar with a logo and navigation links.
 * It uses components from the `shadcn/ui` library for the navigation menu.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigationLinks = (
        <>
            <NavigationMenuItem className="p-2 ml-[4px]">
                <NavigationMenuLink asChild>
                    <Link
                        to="/"
                        className={`${navigationMenuTriggerStyle} max-lg:ml-10 font-bold text-2xl hover:border-b-2 border-white`}
                    >
                        Home
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="p-2">
                <NavigationMenuLink asChild>
                    <Link
                        to="/about"
                        className={`${navigationMenuTriggerStyle} max-lg:ml-10 font-bold text-2xl hover:border-b-2 border-white`}
                    >
                        About Us
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="p-2">
                <NavigationMenuLink asChild>
                    <Link
                        to="/manage-product"
                        className={`${navigationMenuTriggerStyle} max-lg:ml-10 font-bold text-2xl hover:border-b-2 border-white`}
                    >
                        Manage-product
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="p-2">
                <NavigationMenuLink asChild>
                    <Link
                        to="/contact"
                        className={`${navigationMenuTriggerStyle} max-lg:ml-10 font-bold text-2xl hover:border-b-2 border-white`}
                    >
                        Contact
                    </Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </>
    );
    //   bg-transparent
    return (
        <div className="border-b-2 bg-gradient-to-t from-amber-950 to-amber-700 fixed top-0 left-0 w-full z-30">
            <div className="flex justify-between items-center max-w-screen-lg mx-auto p-4">
                {/* Hamburger Menu Icon for Mobile */}
                <div className="flex">
                    <div className="lg:hidden flex items-center">
                        <button onClick={toggleMenu} className="text-white">
                            {isMenuOpen ? (
                                <FiX size={30} />
                            ) : (
                                <FiMenu size={30} />
                            )}
                        </button>
                    </div>
                    {/* Logo and Home link */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="h-24" alt="Logo" />
                    </Link>
                </div>

                {/* Navigation Menu for Desktop */}
                <NavigationMenu className="hidden lg:flex">
                    <NavigationMenuList className="flex justify-end text-white font-['Open_Sans'] ml-10">
                        {navigationLinks}
                    </NavigationMenuList>
                </NavigationMenu>
                <div className="text-white w-50">
                    <div className="flex justify-center items-center">
                        <FaCartArrowDown className="text-xl " />
                        <span className="ms-2 text-xl">Cart</span>
                    </div>

                    <div className="text-xl">
                        <Link to="/">Login </Link>/ <Link to="/">Register</Link>
                    </div>
                </div>
            </div>

            {/* Navigation Menu for Mobile */}
            {isMenuOpen && (
                <div className="lg:hidden bg-gradient-to-t from-amber-950 to-amber-700 w-full">
                    <NavigationMenu className="uppercase">
                        <NavigationMenuList className="flex flex-col items-start text-white font-['Open_Sans'] p-4">
                            {navigationLinks}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            )}
        </div>
    );
};

export default Navbar;
