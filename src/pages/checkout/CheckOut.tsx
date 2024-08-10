import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Toaster, toast } from "sonner";
import GlobalImages from "../Shared/globalImage/GlobalImages";
import { useLocation, useNavigate } from "react-router-dom";
import { CartItem, FormData, TOrderRequest } from "@/types";
import {
    useCreateOrderMutation,
    useLazyGetProductsQuery,
    useUpdateProductMutation,
} from "@/redux/api/baseApi";
import "./CheckOut.css";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";

const CheckOut: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { cartItems, totalPriceWithVAT } = location.state || {
        cartItems: [],
        totalPriceWithVAT: 0,
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const [createOrder] = useCreateOrderMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [trigger, { isLoading }] = useLazyGetProductsQuery(); // Destructure correctly

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        if (!data.termsAgreed) {
            toast.error("Please agree to the terms and conditions.", {
                duration: 4000,
                style: {
                    background: "#f44336",
                    color: "#fff",
                },
            });
            return;
        }

        const orderData: TOrderRequest = {
            items: cartItems,
            totalPriceWithVAT,
            userDetails: data,
            status: "Pending",
        };

        try {
            // Create the order
            await createOrder(orderData).unwrap();

            // Deduct quantities from the product stock
            await Promise.all(
                cartItems.map(async (item: CartItem) => {
                    const updatedStock = item.quantity - item.stock; // Correct logic
                    if (updatedStock >= 0) {
                        await updateProduct({
                            id: item.id,
                            data: { stock: updatedStock },
                        }).unwrap();
                    }
                })
            );

            // Refetch products to get the latest stock values
            await trigger(); // Trigger the lazy query

            // Show success toast
            toast.success("Order placed successfully!", {
                position: "top-center",
                style: {
                    background: "#451a03",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    border: "2px solid white",
                },
            });

            // Redirect to success page
            navigate("/success", {
                state: {
                    message: "Your order has been placed successfully!",
                },
            });
        } catch (error) {
            // Show error toast
            toast.error("An error occurred while placing the order.", {
                duration: 4000,
                style: {
                    background: "#f44336",
                    color: "#fff",
                },
            });
        }
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    if (isLoading) {
        return (
            <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
                Loading....
            </p>
        );
    }

    return (
        <>
            <GlobalImages />
            <div className="bg-amber-200  bg-opacity-50 bg-shad">
                <div className="max-w-screen-lg mx-auto py-16 px-5 xl:px-0">
                    <h2 className="text-4xl text-orange-800 font-bold text-start uppercase mb-3">
                        Checkout
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="border-2 border-orange-800 p-8  bg-amber-900 bg-opacity-10">
                                <h2 className="text-2xl font-semibold mb-2 ">
                                    User Details
                                </h2>

                                <div className="mb-4">
                                    <label
                                        htmlFor="name"
                                        className="block font-bold text-xl"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register("name", {
                                            required: "Name is required",
                                        })}
                                        className="border-2 border-orange-800 p-1 w-full"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block font-bold text-xl"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email", {
                                            required: "Email is required",
                                        })}
                                        className="border-2 border-orange-800 p-1 w-full"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="phone"
                                        className="block font-bold text-xl"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        {...register("phone", {
                                            required:
                                                "Phone number is required",
                                        })}
                                        className="border-2 border-orange-800 p-1 w-full"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="address"
                                        className="block font-bold text-xl"
                                    >
                                        Delivery Address
                                    </label>
                                    <textarea
                                        id="address"
                                        {...register("address", {
                                            required: "Address is required",
                                        })}
                                        className="border-2 border-orange-800 p-1 w-full"
                                    ></textarea>
                                    {errors.address && (
                                        <p className="text-red-500">
                                            {errors.address.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Payment Methods Section */}
                            <div className="p-8 border-2 border-orange-800 bg-amber-900 bg-opacity-10">
                                <h2 className="text-2xl font-semibold mb-2">
                                    Payment Methods
                                </h2>
                                <div className="mb-4">
                                    <label>
                                        <input
                                            type="radio"
                                            {...register("paymentMethod", {
                                                required:
                                                    "Payment method is required",
                                            })}
                                            value="Cash"
                                            className="text-orange-800"
                                        />
                                        <span className="text-2xl font-sans">
                                            {" "}
                                            Cash on Delivery
                                        </span>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label>
                                        <input
                                            type="radio"
                                            {...register("paymentMethod", {
                                                required:
                                                    "Payment method is required",
                                            })}
                                            value="Credit Card"
                                            className="bg-orange-800"
                                        />
                                        <span className="text-2xl font-sans">
                                            {" "}
                                            Credit Card Payment
                                        </span>
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label>
                                        <input
                                            type="radio"
                                            {...register("paymentMethod", {
                                                required:
                                                    "Payment method is required",
                                            })}
                                            value="PayPal"
                                            className="bg-orange-800"
                                        />
                                        <span className="text-2xl font-sans">
                                            {" "}
                                            PayPal Payment
                                        </span>
                                    </label>
                                </div>
                                {errors.paymentMethod && (
                                    <p className="text-red-500">
                                        {errors.paymentMethod.message}
                                    </p>
                                )}
                                <p className="text-lg mb-3">
                                    Your personal data will be used to process
                                    your order, support your experience
                                    throughout this website, and for other
                                    purposes described in our privacy policy.
                                </p>
                                <div className="mb-4">
                                    <label>
                                        <input
                                            type="checkbox"
                                            {...register("termsAgreed", {
                                                required:
                                                    "You must agree to the terms and conditions",
                                            })}
                                            className="bg-orange-800"
                                        />
                                        <span className="text-md font-sans">
                                            {" "}
                                            I have read and agree to the website
                                            terms and conditions
                                        </span>
                                    </label>
                                </div>
                                {errors.termsAgreed && (
                                    <p className="text-red-500">
                                        {errors.termsAgreed.message}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    onClick={handleClearCart}
                                    className="mt-4  uppercase hover:bg-orange-800 border-2 border-orange-800 hover:text-white text-orange-800 px-4 py-2 transition duration-300"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Toast Container */}
            <Toaster />
        </>
    );
};

export default CheckOut;
