import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import image11 from "../../assets/images/image-11.png";
import { useInView } from "react-intersection-observer";
import { IoLocation } from "react-icons/io5";
import { FaPhoneVolume, FaRightLong } from "react-icons/fa6";
import { TfiEmail } from "react-icons/tfi";


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
            className="bg-amber-50 bg-cover bg-center bg-no-repeat py-16 px-5 xl:px-0"
            style={{ backgroundImage: `url(${image11})` }}
        >
            {" "}
            <div className="container mx-auto">
                <div className="flex items-center mb-10">
                    <h2 className="text-xl ps-5 xl:ps-0 md:text-2xl font-bold text-amber-950 uppercase">
                        Contact Us
                    </h2>
                    <FaRightLong className="ms-3 text-amber-950" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 shadow-lg rounded-lg bg-amber-950 bg-opacity-50 p-10">

                    <div className="col-span-2 p-10 border border-amber-800">
                        <h2 className="text-3xl font-extrabold mb-6 text-amber-100">Contact Information</h2>
                        <div className="flex flex-col space-y-4 text-amber-100">
                            <div className="flex items-center space-x-2">
                                <IoLocation className="text-2xl font-bold" />
                                <p className="text-md ">Address: Patenga, City, Bangladesh</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaPhoneVolume className="text-2xl font-bold" />
                                <p className="text-md">Phone: +88 01834491602</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TfiEmail className="text-2xl font-bold" />
                                <p className="text-md font-bold">Email: debos.das.02@gmail.com</p>
                            </div>
                        </div>
                        <div className="mt-6 text-amber-100 text-sml font-normal">
                            At  sporting goods, we value communication and are always here to assist you with any   inquiries, feedback, or support you may need. Whether you're interested in learning more about our products, need help with your order, we are committed to providing you with prompt and helpful responses.
                        </div>

                    </div>
                    <div
                        ref={ref}
                        className={`p-10  rounded-lg shadow-lg text-amber-100 col-span-3 border border-orange-800   ${inView ? "animate__animated animate__fadeInUp" : ""
                            }`}
                    >

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-semibold text-amber-100 mb-1"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register("name", {
                                            required: "Name is required",
                                        })}
                                        className={`w-full border ${errors.name
                                            ? "border-red-500"
                                            : "border-orange-800"
                                            } text-orange-700 p-1 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition`}
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
                                        className="block text-sm font-semibold text-amber-100 mb-1"
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
                                        className={`w-full border ${errors.email
                                            ? "border-red-500"
                                            : "border-orange-800"
                                            } text-orange-700 p-1 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition`}
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
                                        className="block text-sm font-semibold text-amber-100 mb-1"
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
                                        className={`w-full border ${errors.phone
                                            ? "border-red-500"
                                            : "border-orange-800"
                                            } text-orange-700 p-1 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition`}
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
                                        className="block text-sm font-semibold text-amber-100 mb-1"
                                    >
                                        Subject
                                    </label>
                                    <select
                                        id="subject"
                                        {...register("subject")}
                                        className="w-full border border-orange-800 text-orange-700 p-1 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
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
                                <label className="block text-sm font-semibold mb-1">
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
                                    className="block text-sm font-semibold text-amber-100 mb-1"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    {...register("message", {
                                        required: "Message is required",
                                    })}
                                    className={`w-full border ${errors.message
                                        ? "border-red-500"
                                        : "border-orange-800"
                                        } text-orange-700 p-1 rounded-lg shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition`}
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
                                className="text-center uppercase bg-amber-950 px-5 text-amber-100 py-3 border shadow-md  transition-colors duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;
