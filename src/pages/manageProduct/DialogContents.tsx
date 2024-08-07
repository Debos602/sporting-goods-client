import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TProducts } from "@/types"; // Ensure this import points to the correct path
import { DialogContent } from "@/components/ui/dialog";

interface DialogContentsProps {
    product: TProducts;
    handleUpdate: (data: TProducts) => Promise<void>; // Update the prop type
}

const DialogContents: React.FC<DialogContentsProps> = ({
    product,
    handleUpdate,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TProducts>({
        defaultValues: {
            ...product,
            name: "", // Set to empty to not show default value
            price: undefined, // Set to undefined to not show default value
            description: "", // Set to empty to not show default value
        },
    });

    const onSubmit: SubmitHandler<TProducts> = async (data) => {
        await handleUpdate(data); // Pass form data to handleUpdate function
    };

    return (
        <DialogContent className="p-4  text-white rounded-md bg-gradient-to-b from-amber-700 to-amber-900">
            <h2 className="text-lg font-bold">Edit Product</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-0">
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="_id" className="">
                        Product ID
                    </label>
                    <input
                        type="text"
                        {...register("_id", {
                            required: "Product name is required",
                        })}
                        placeholder="Product Name"
                        className=" px-5 border w-80 text-black"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>

                {/* Name Input: Not showing default value */}
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="name" className="">
                        Product Name
                    </label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Product name is required",
                        })}
                        placeholder="Product Name"
                        className="px-5 border  w-80 text-black"
                    />
                    {errors.name && (
                        <p className="text-red-500">{errors.name.message}</p>
                    )}
                </div>
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="category_id" className="">
                        Category ID
                    </label>
                    <input
                        type="number"
                        {...register("category_id", {
                            required: "Category ID is required",
                            valueAsNumber: true,
                        })}
                        placeholder="Category Id"
                        className="px-5 border  w-80 text-black"
                    />
                    {errors.category_id && (
                        <p className="text-red-500">
                            {errors.category_id.message}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="category" className="">
                        Category
                    </label>
                    <input
                        type="text"
                        {...register("category", {
                            required: "Category is required",
                        })}
                        placeholder="Category"
                        className="px-5 border  w-80 text-black"
                    />
                    {errors.category && (
                        <p className="text-red-500">
                            {errors.category.message}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="stock" className="">
                        Stock
                    </label>
                    <input
                        type="number"
                        {...register("stock", {
                            required: "Stock is required",
                            valueAsNumber: true,
                        })}
                        placeholder="Stock"
                        className="px-5 border  w-80 text-black"
                    />
                    {errors.stock && (
                        <p className="text-red-500">{errors.stock.message}</p>
                    )}
                </div>

                {/* Description Input: Not showing default value */}
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="brand" className="">
                        Brand
                    </label>
                    <input
                        type="text"
                        {...register("brand", {
                            required: "Brand is required",
                        })}
                        placeholder="Brand"
                        className="px-5 border  w-80 text-black"
                    />
                    {errors.brand && (
                        <p className="text-red-500">{errors.brand.message}</p>
                    )}
                </div>
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="rating" className="">
                        Rating
                    </label>

                    <input
                        type="number"
                        step="0.1"
                        {...register("rating", {
                            required: "Rating is required",
                            valueAsNumber: true,
                        })}
                        placeholder="Rating"
                        className="px-5 border w-80 text-black"
                    />
                    {errors.rating && (
                        <p className="text-red-500">{errors.rating.message}</p>
                    )}
                </div>

                {/* Price Input: Not showing default value */}
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="price" className="">
                        Price
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        {...register("price", {
                            required: "Price is required",
                            valueAsNumber: true,
                        })}
                        placeholder="Price"
                        className="px-5 border   w-80 text-black"
                    />
                    {errors.price && (
                        <p className="text-red-500">{errors.price.message}</p>
                    )}
                </div>
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="image" className="">
                        Image
                    </label>
                    <input
                        type="file"
                        {...register("image")}
                        className="px-5 border  w-80 text-black"
                    />
                    {errors.image && (
                        <p className="text-red-500">{errors.image.message}</p>
                    )}
                </div>
                <div className="grid grid-cols-4 items-center">
                    <label htmlFor="description" className="">
                        Description
                    </label>
                    <textarea
                        {...register("description", {
                            required: "Description is required",
                        })}
                        placeholder="Description"
                        className="px-5 border  w-80 text-black"
                    />
                    {errors.description && (
                        <p className="text-red-500">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="border-2 text-white p-2 bg-orange-900 hover:border-orange-900 hover:bg-white transition duration-700 ease-in-out hover:text-orange-800 uppercase"
                    disabled={isSubmitting}
                >
                    Update Product
                </button>
            </form>
        </DialogContent>
    );
};

export default DialogContents;
