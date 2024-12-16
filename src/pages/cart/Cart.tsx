// src/components/Cart.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/api/baseApi";
import Rating from "react-rating";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Star } from "lucide-react";
import bgImage from "../../assets/images/manageImage.jpg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart, selectCartItems } from "@/redux/cartSlice";
import GlobalImage from "../Shared/globalImage/GlobalImage";

import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";
import useNav from "@/hooks/UserNav";

const Cart: React.FC = () => {
    const { id: _id } = useParams<{ id: string; }>();
    const navigate = useNavigate();
    const { data: productData, isLoading } = useGetSingleProductQuery(
        _id as string
    );
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    useNav("Product-Details");
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => selectCartItems(state));
    const existingItem = cartItems.find((item) => item.id === _id);

    if (isLoading) {
        return (
            <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
                Loading...
            </p>
        );
    }

    if (!productData) {
        return (
            <p className="text-3xl text-center text-red-500 my-2 font-bold">
                Product not found
            </p>
        );
    }

    const product = productData?.data;

    const { name, description, category, brand, stock, rating, price, image } =
        product;

    const handleCartPage = () => {
        navigate("/cartpage");
    };

    const handleAddToCart = () => {
        if (!_id) return; // Guard against undefined id

        const itemStock = existingItem?.stock ?? 0; // Provide default value of 0
        if (itemStock < stock) {
            dispatch(
                addToCart({
                    id: _id,
                    name: name, // Add name
                    price: price, // Add price
                    stock: itemStock + 1,
                    quantity: product.stock,
                })
            );
        } else {
            console.log(
                "Cannot add more items to the cart. Stock limit reached."
            );
        }

        toast.success(`Product ${name} added to cart!`, {
            position: "top-center",
            style: {
                background: "#451a03",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                border: "2px solid white",
            },
        });
    };

    const getStarColor = (ratingValue: number) => {
        if (ratingValue >= 0 && ratingValue < 2) {
            return "#EF4444"; // Red
        } else if (ratingValue >= 2 && ratingValue < 3) {
            return "#F97316"; // Orange
        } else if (ratingValue >= 3 && ratingValue < 4) {
            return "#F59E0B"; // Yellow
        } else if (ratingValue >= 4 && ratingValue <= 5) {
            return "#F59E0B"; // Yellow
        }
        return "#F59E0B"; // Default Yellow
    };

    return (
        <>
            <GlobalImage></GlobalImage>

            <section
                className="bg-cover bg-center relative z-10 py-16"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="max-w-screen-xl mx-auto">
                    <h2
                        className={`text-4xl ps-5 lg:ps-0 font-semibold text-white relative z-20 mb-10  inline-block ${inView ? "animate__animated animate__fadeInUp" : ""
                            }`}
                    >
                        Details Sports Goods
                    </h2>
                </div>
                <div className="flex justify-center items-center ">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 h-full w-full"></div>
                    <div className="max-w-screen-xl mx-auto relative z-20 w-full bg-orange-50 shadow-lg  p-8">
                        <div className="flex flex-col md:flex-row">
                            <div
                                ref={ref}
                                className={`w-full md:w-1/2 border border-orange-950 mr-5 bg-amber-50 overflow-hidden ${inView
                                    ? "animate__animated animate__fadeInLeft"
                                    : ""
                                    }`}
                            >
                                <PhotoProvider>
                                    <PhotoView src={image}>
                                        <img
                                            src={image}
                                            alt={name}
                                            className=" p-2 w-full  object-cover cursor-pointer transition-transform transform hover:scale-105"
                                        />
                                    </PhotoView>
                                </PhotoProvider>
                            </div>
                            <div
                                className={`w-full md:w-1/2 px-8 py-32 border border-orange-950 bg-amber-50 ${inView
                                    ? "animate__animated animate__fadeInRight"
                                    : ""
                                    }`}
                            >
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {name}
                                </h1>
                                <p className="text-lg text-gray-900 mb-4">
                                    {description}
                                </p>
                                <p className="text-lg text-gray-900 mb-2">
                                    <strong>Category:</strong> {category}
                                </p>
                                <p className="text-lg text-gray-900 mb-2">
                                    <strong>Brand:</strong> {brand}
                                </p>
                                <p className="text-lg text-gray-900 mb-2">
                                    <strong>Stock Quantity:</strong> {stock}
                                </p>
                                <div className="flex items-center mb-4">
                                    <span className="text-gray-900 flex items-center">
                                        <strong>Rating</strong>:{" "}
                                        <div className="mt-2 ms-2">
                                            <Rating
                                                initialRating={rating}
                                                emptySymbol={
                                                    <Star
                                                        size={20}
                                                        color={getStarColor(
                                                            rating
                                                        )}
                                                    />
                                                }
                                                fullSymbol={
                                                    <Star
                                                        size={20}
                                                        color={getStarColor(
                                                            rating
                                                        )}
                                                        fill={getStarColor(
                                                            rating
                                                        )}
                                                    />
                                                }
                                                fractions={2}
                                                readonly={true}
                                                stop={5}
                                            />
                                        </div>
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-4">
                                    Price: ${price}
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={handleAddToCart}
                                        className={`bg-orange-700 text-white  hover:bg-white border border-orange-950 uppercase py-2 px-4  hover:text-orange-700 font-semibold transition duration-300 ease-in-out ${(existingItem?.stock ?? 0) >= stock
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                            }`}
                                        disabled={
                                            (existingItem?.stock ?? 0) >= stock
                                        }
                                    >
                                        {(existingItem?.stock ?? 0) >= stock
                                            ? "Out of Stock"
                                            : "Add To Cart"}
                                    </button>
                                    <Button
                                        onClick={handleCartPage}
                                        className="bg-orange-700 uppercase text-white border border-orange-950 py-2 px-4 \ hover:bg-white hover:text-orange-700 font-semibold transition duration-300"
                                    >
                                        View Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Cart;
