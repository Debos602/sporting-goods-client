import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import image11 from "../../assets/images/image-11.png";
import { useInView } from "react-intersection-observer";

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    subject: string;
    contactMethod: "email" | "phone";
}

const ContactUs: React.FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            subject: "Product Inquiry",
            contactMethod: "email",
        },
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form Data:", data);
        // Handle form submission logic here, e.g., sending the data to a server
        reset(); // Optionally reset the form after submission
    };
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <div
            className="bg-amber-100 py-16 px-5 xl:px-0"
            style={{ backgroundImage: `url(${image11})` }}
        >
            {" "}
            <div
                ref={ref}
                className={`max-w-4xl mx-auto p-6  rounded-lg shadow-lg border-2 border-amber-800 ${
                    inView ? "animate__animated animate__fadeInUp" : ""
                }`}
            >
                <h2 className="text-4xl font-extrabold text-center text-orange-800 mb-8">
                    Contact Us
                </h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-lg font-semibold text-gray-700 mb-2"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                                className={`w-full border-2 ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-orange-800"
                                } text-orange-700 p-4 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition`}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-semibold text-gray-700 mb-2"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                className={`w-full border-2 ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-orange-800"
                                } text-orange-700 p-4 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition`}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-lg font-semibold text-gray-700 mb-2"
                            >
                                Phone Number (Optional)
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                {...register("phone", {
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Invalid phone number",
                                    },
                                })}
                                className={`w-full border-2 ${
                                    errors.phone
                                        ? "border-red-500"
                                        : "border-orange-800"
                                } text-orange-700 p-4 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition`}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="block text-lg font-semibold text-gray-700 mb-2"
                            >
                                Subject
                            </label>
                            <select
                                id="subject"
                                {...register("subject")}
                                className="w-full border-2 border-orange-800 text-orange-700 p-4 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                            >
                                <option value="Product Inquiry">
                                    Product Inquiry
                                </option>
                                <option value="Order Issue">Order Issue</option>
                                <option value="Feedback">Feedback</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-lg font-semibold mb-2">
                            Preferred Contact Method
                        </label>
                        <div className="flex space-x-6">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="email"
                                    {...register("contactMethod")}
                                    className="mr-2 accent-orange-600"
                                />
                                Email
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="phone"
                                    {...register("contactMethod")}
                                    className="mr-2 accent-orange-600"
                                />
                                Phone
                            </label>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-lg font-semibold text-gray-700 mb-2"
                        >
                            Message
                        </label>
                        <textarea
                            id="message"
                            {...register("message", {
                                required: "Message is required",
                            })}
                            className={`w-full border-2 ${
                                errors.message
                                    ? "border-red-500"
                                    : "border-orange-800"
                            } text-orange-700 p-4 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition`}
                            rows={6}
                        />
                        {errors.message && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full uppercase bg-gradient-to-t from-amber-950 to-amber-700 text-white py-3 rounded-lg shadow-md hover:bg-orange-900 transition-colors duration-300"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
