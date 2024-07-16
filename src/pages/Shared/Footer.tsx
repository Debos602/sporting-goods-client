import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FaFacebookSquare, FaYoutube, FaWhatsappSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-t from-amber-950 to-amber-700 text-white py-8">
            <div className="container mx-auto flex flex-col items-center">
                {/* <!-- Logo --> */}
                <div className="mb-4">
                    <img src={logo} alt="Logo" className="h-20" />
                </div>

                {/* <!-- Social Icons --> */}
                <div className="flex space-x-4 mb-4">
                    <Link to="https://facebook.com" target="_blank">
                        <FaFacebookSquare className="h-7 w-7" />
                    </Link>
                    <Link to="https://twitter.com" target="_blank">
                        <BsTwitter className="h-7 w-7" />
                    </Link>
                    <Link to="https://youtube.com" target="_blank">
                        <FaYoutube className="h-7 w-7" />
                    </Link>
                    <Link to="https://whatsapp.com" target="_blank">
                        <FaWhatsappSquare className="h-7 w-7" />
                    </Link>
                </div>

                {/* <!-- Email --> */}
                <div className="mb-4">
                    <Link
                        to="mailto:debos.das.02@gmail.com"
                        className="text-white hover:text-gray-300"
                    >
                        Email: Debos.das.02@gmail.com
                    </Link>
                </div>

                {/* <!-- New Sections --> */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center mb-4">
                    {/* <!-- Policies --> */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="font-bold mb-2 text-amber-600 hover:text-amber-600">
                            POLICIES
                        </h3>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    to="/refund-policy"
                                    className="hover:text-gray-300"
                                >
                                    Refund Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shipping-policy"
                                    className="hover:text-gray-300"
                                >
                                    Shipping Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="hover:text-gray-300"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms-of-service"
                                    className="hover:text-gray-300"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Information --> */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="font-bold mb-2 text-amber-600 hover:text-amber-600">
                            INFORMATION
                        </h3>
                        <ul className="space-y-1">
                            <li>
                                <Link
                                    to="/mobile-app"
                                    className="hover:text-gray-300"
                                >
                                    Mobile App
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/track-order"
                                    className="hover:text-gray-300"
                                >
                                    Track Your Order
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    className="hover:text-gray-300"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/faqs"
                                    className="hover:text-gray-300"
                                >
                                    FAQs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about-us"
                                    className="hover:text-gray-300"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-gray-300"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Newsletter --> */}
                    <div className="w-full md:w-1/3">
                        <h3 className="font-bold mb-2 text-amber-600 hover:text-amber-600">
                            NEWSLETTER
                        </h3>
                        <p className="mb-2">
                            Sign up to get access to savings of up to 90% OFF.
                        </p>
                        <form className="flex flex-col">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="p-2 mb-2 text-black rounded"
                            />
                            <button
                                type="submit"
                                className="bg-amber-500 hover:bg-amber-600 text-white py-2 rounded"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* <!-- ABOUT DAILYSALE.COM --> */}
                <div className="max-w-2xl mb-4 text-center">
                    <h3 className="font-bold mb-2 text-amber-600 hover:text-amber-600">
                        ABOUT DAILYSALE.COM
                    </h3>
                    <p className="mb-2">
                        We strive to perfect the e-commerce buying experience by
                        providing the best customer service and one of the
                        lowest prices to our customers. Our customers buy from
                        us knowing that they will be paying one of the lowest
                        prices, with a full 30-day return and replacement
                        policy.
                    </p>
                </div>

                {/* <!-- Copyright Text --> */}
                <div className="text-sm">
                    &copy; Copyright 2024 by Sporting Equipment. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
