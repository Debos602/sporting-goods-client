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

const CheckOut: React.FC = () => {
    const navigate = useNavigate();
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
            toast("Order placed successfully!", {
                duration: 4000,
                style: {
                    background: "#4caf50",
                    color: "#fff",
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
            toast("An error occurred while placing the order.", {
                duration: 4000,
                style: {
                    background: "#f44336",
                    color: "#fff",
                },
            });
        }
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
            <div className="max-w-screen-lg mx-auto flex">
                {/* User Details Section */}
                <div className="w-1/2 p-4">
                    <h2 className="text-lg font-semibold">User Details</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className="border p-2 w-full"
                            />
                            {errors.name && (
                                <p className="text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                                className="border p-2 w-full"
                            />
                            {errors.email && (
                                <p className="text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                {...register("phone", {
                                    required: "Phone number is required",
                                })}
                                className="border p-2 w-full"
                            />
                            {errors.phone && (
                                <p className="text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block">
                                Delivery Address
                            </label>
                            <textarea
                                id="address"
                                {...register("address", {
                                    required: "Address is required",
                                })}
                                className="border p-2 w-full"
                            ></textarea>
                            {errors.address && (
                                <p className="text-red-500">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 text-white p-2 rounded"
                        >
                            Place Order
                        </button>
                    </form>
                </div>

                {/* Payment Methods Section */}
                <div className="w-1/2 p-4">
                    <h2 className="text-lg font-semibold">Payment Methods</h2>
                    <div className="mb-4">
                        <label>
                            <input
                                type="radio"
                                {...register("paymentMethod")}
                                value="Cash"
                                defaultChecked
                            />
                            Cash on Delivery
                        </label>
                    </div>
                    {/* Add more payment methods if needed */}
                </div>
            </div>

            {/* Toast Container */}
            <Toaster />
        </>
    );
};

export default CheckOut;
