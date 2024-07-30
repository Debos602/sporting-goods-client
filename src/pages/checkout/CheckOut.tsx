import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import GlobalImages from "../Shared/globalImage/GlobalImages";
import SuccessModal from "./SuccessModal";
// Assume you have a SuccessModal component

interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
}

const CheckOut: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();
    const [orderPlaced, setOrderPlaced] = useState(false);

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        // Here you can handle the logic to deduct stock and place the order

        // Show success modal
        setOrderPlaced(true);
    };

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
                            <input type="radio" name="payment" value="cod" />
                            Cash on Delivery
                        </label>
                    </div>
                    <div className="mb-4">
                        <label>
                            <input type="radio" name="payment" value="cod" />
                            Cash on Delivery
                        </label>
                    </div>
                    {/* Add more payment methods if needed */}
                </div>
            </div>

            {orderPlaced && <SuccessModal />}
        </>
    );
};

export default CheckOut;
