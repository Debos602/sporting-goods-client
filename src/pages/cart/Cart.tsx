import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "@/redux/api/baseApi";
import Rating from "react-rating";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { Star } from "lucide-react";
import bgImage from "../../assets/images/istockphoto-949190756-170667a.webp";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addToCart, selectCartItems } from "@/redux/cartSlice";

const Cart: React.FC = () => {
    const { id: _id } = useParams<{ id: string }>();

    const { data: productData, isLoading } = useGetSingleProductQuery(
        _id as string
    );

    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => selectCartItems(state));
    const existingItem = cartItems.find((item) => item.id === _id);
    console.log(existingItem);

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

    const handleAddToCart = () => {
        if (!_id) return; // Guard against undefined id

        const itemQuantity = existingItem?.stock ?? 0; // Provide default value of 0
        if (itemQuantity < stock) {
            dispatch(addToCart({ id: _id, stock: itemQuantity + 1 }));
        } else {
            console.log(
                "Cannot add more items to the cart. Stock limit reached."
            );
        }
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
        <div
            className="flex justify-center items-center bg-amber-100 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="absolute inset-0 bg-slate-900 bg-opacity-50 h-full w-full"></div>
            <div className="max-w-3xl relative z-20 w-full bg-white shadow-lg rounded-lg p-8 mt-[140px] mb-[40px]">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 border-2 border-orange-800 mr-5 bg-gradient-to-t from-amber-200 to-transparent rounded-lg overflow-hidden">
                        <PhotoProvider>
                            <PhotoView src={image}>
                                <img
                                    src={image}
                                    alt={name}
                                    className="w-full h-full object-cover cursor-pointer transition-transform transform hover:scale-105"
                                />
                            </PhotoView>
                        </PhotoProvider>
                    </div>
                    <div className="w-full md:w-1/2 p-8 border-2 border-orange-800 bg-gradient-to-t from-amber-200 to-transparent rounded">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {name}
                        </h1>
                        <p className="text-lg text-gray-700 mb-4">
                            {description}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Category:</strong> {category}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Brand:</strong> {brand}
                        </p>
                        <p className="text-sm text-gray-600 mb-2">
                            <strong>Stock Quantity:</strong> {stock}
                        </p>
                        <div className="flex items-center mb-4">
                            <span className="text-gray-700 flex items-center">
                                <strong>Rating</strong>:{" "}
                                <div className="mt-2 ms-2">
                                    <Rating
                                        initialRating={rating}
                                        emptySymbol={
                                            <Star
                                                size={20}
                                                color={getStarColor(rating)}
                                            />
                                        }
                                        fullSymbol={
                                            <Star
                                                size={20}
                                                color={getStarColor(rating)}
                                                fill={getStarColor(rating)}
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
                        <button
                            onClick={handleAddToCart}
                            className={`bg-orange-800 text-white py-2 px-4 rounded hover:bg-orange-600 transition duration-300 ${
                                (existingItem?.stock ?? 0) >= stock
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                            disabled={(existingItem?.stock ?? 0) >= stock}
                        >
                            {(existingItem?.stock ?? 0) >= stock
                                ? "Out of Stock"
                                : "Add To Cart"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
