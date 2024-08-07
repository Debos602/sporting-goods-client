// ManageProduct.tsx
import { useForm, SubmitHandler } from "react-hook-form";
import {
    useGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation, // Uncommenteds
    useDeleteProductMutation,
} from "@/redux/api/baseApi";
import {
    TCreateProductRequest,
    TProducts,
    // TUpdateProductRequest,
} from "@/types";
import ManagImage from "../Shared/globalImage/ManagImage";
import image2 from "../../assets/images/manageImage.jpg";
import "./ManageProduct.css";
import { FaArrowRightLong } from "react-icons/fa6";
import image9 from "../../assets/images/img-9.png";
import image10 from "../../assets/images/image-11.png";
import { Parallax } from "react-parallax";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DialogContents from "./DialogContents";
import { useNavigate } from "react-router-dom";

const IMGBB_API_KEY = "09bd3d3e0869a6943ef1ad6d74606666";

const ManageProduct = () => {
    const { data: productResponse, refetch } = useGetProductQuery([]);
    const navigate = useNavigate();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation(); // Uncommented
    const [deleteProduct] = useDeleteProductMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TProducts>();

    const onSubmit: SubmitHandler<TProducts> = async (data) => {
        try {
            let imageUrl = "";
            if (data.image && data.image[0]) {
                const formData = new FormData();
                formData.append("image", data.image[0]);

                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const result = await response.json();
                imageUrl = result.data.url;
            }

            const productData: TCreateProductRequest = {
                product: {
                    ...data,
                    image: imageUrl,
                },
            };

            console.log("Product data:", productData);

            try {
                await createProduct(productData).unwrap();
                toast.success("Product created successfully!");
                refetch();
            } catch (error) {
                console.error("Create product error:", error);
                toast.error("Failed to create product");
            }

            refetch();
            reset();
        } catch (error) {
            toast.error("Failed to save product");
            console.error("Failed to save product:", error);
        }
    };

    const handleUpdate = async (product: TProducts) => {
        try {
            let imageUrl = "";

            // Check if an image file exists and upload it
            if (product?.image && product?.image[0]) {
                const formData = new FormData();
                formData.append("image", product?.image[0]);

                // Use the fetch API to upload the image to ImgBB
                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                // Parse the JSON response
                const result = await response.json();

                // Store the image URL from the upload response
                imageUrl = result.data.url;
            }

            // Create an object that conforms to { id: string; data: Partial<TUpdateProductRequest> }
            const updatedRequest = {
                id: product._id, // Use the product ID for identification
                data: {
                    // Construct a partial object of type TUpdateProductRequest
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    category_id: product.category_id,
                    stock: product.stock,
                    brand: product.brand,
                    rating: product.rating,
                    image: imageUrl || product.image, // Use the uploaded image URL or the existing one
                },
            };

            console.log("Updated product request:", updatedRequest);

            // Call the updateProduct function with the correct argument shape
            await updateProduct(updatedRequest).unwrap(); // Unwrap the promise to handle errors

            // Show a success toast notification
            toast.success("Product updated successfully!");
            navigate("/all-products");
            // Refetch data to update the UI
            refetch();
        } catch (error) {
            // Log and notify about any errors during the update process
            console.error("Update product error:", error);
            toast.error("Failed to update product");
        }
    };

    return (
        <>
            <ManagImage />
            <div
                className="bg-amber-100 bg-no-repeat bg-top"
                style={{ backgroundImage: `url(${image10})` }}
            >
                <div className="mx-auto max-w-screen-lg py-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div
                            className="bg-orange-900 text-white p-8 bg-cover bg-no-repeat"
                            style={{ backgroundImage: `url(${image9})` }}
                        >
                            <h1 className="text-4xl font-light">
                                Manage Products
                            </h1>
                            <p className="text-xl font-medium mb-2">
                                Add new product
                            </p>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                                <input
                                    type="text"
                                    {...register("id", {
                                        required: "ID is required",
                                    })}
                                    placeholder="ID"
                                    className="border p-2 w-full text-white bg-black"
                                />
                                {errors.id && (
                                    <p className="text-red-500">
                                        {errors.id.message}
                                    </p>
                                )}

                                <input
                                    type="text"
                                    {...register("name", {
                                        required: "Product name is required",
                                    })}
                                    placeholder="Product Name"
                                    className="border p-2 w-full text-white bg-black"
                                />
                                {errors.name && (
                                    <p className="text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}

                                <input
                                    type="number"
                                    {...register("category_id", {
                                        required: "Category ID is required",
                                        valueAsNumber: true,
                                    })}
                                    placeholder="Category Id"
                                    className="border p-2 w-full text-white bg-black"
                                />
                                {errors.category_id && (
                                    <p className="text-red-500">
                                        {errors.category_id.message}
                                    </p>
                                )}

                                <input
                                    type="text"
                                    {...register("category", {
                                        required: "Category is required",
                                    })}
                                    placeholder="Category"
                                    className="border p-2 w-full text-white bg-black"
                                />
                                {errors.category && (
                                    <p className="text-red-500">
                                        {errors.category.message}
                                    </p>
                                )}

                                <input
                                    type="number"
                                    {...register("stock", {
                                        required: "Stock is required",
                                        valueAsNumber: true,
                                    })}
                                    placeholder="Stock"
                                    className="border p-2 w-full bg-black"
                                />
                                {errors.stock && (
                                    <p className="text-red-500">
                                        {errors.stock.message}
                                    </p>
                                )}

                                <textarea
                                    {...register("description", {
                                        required: "Description is required",
                                    })}
                                    placeholder="Description"
                                    className="border p-2 w-full bg-black"
                                />
                                {errors.description && (
                                    <p className="text-red-500">
                                        {errors.description.message}
                                    </p>
                                )}

                                <input
                                    type="text"
                                    {...register("brand", {
                                        required: "Brand is required",
                                    })}
                                    placeholder="Brand"
                                    className="border p-2 w-full bg-black"
                                />
                                {errors.brand && (
                                    <p className="text-red-500">
                                        {errors.brand.message}
                                    </p>
                                )}

                                <input
                                    type="number"
                                    step="0.1"
                                    {...register("rating", {
                                        required: "Rating is required",
                                        valueAsNumber: true,
                                    })}
                                    placeholder="Rating"
                                    className="border p-2 w-full bg-black"
                                />
                                {errors.rating && (
                                    <p className="text-red-500">
                                        {errors.rating.message}
                                    </p>
                                )}

                                <input
                                    type="number"
                                    step="0.01"
                                    {...register("price", {
                                        required: "Price is required",
                                        valueAsNumber: true,
                                    })}
                                    placeholder="Price"
                                    className="border p-2 w-full bg-black"
                                />
                                {errors.price && (
                                    <p className="text-red-500">
                                        {errors.price.message}
                                    </p>
                                )}

                                <input
                                    type="file"
                                    {...register("image")}
                                    className="border p-2 w-full text-white bg-black"
                                />
                                {errors.image && (
                                    <p className="text-red-500">
                                        {errors.image.message}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    className="border-2 text-white p-2 hover:bg-white transition duration-700 ease-in-out hover:text-orange-800 uppercase"
                                    disabled={isSubmitting}
                                >
                                    Add Product
                                </button>
                            </form>
                        </div>
                        <div className="flex items-center">
                            <div className="text-gray-900 p-8 relative z-10">
                                <h2 className="text-5xl font-bold mb-10">
                                    Get in touch with us
                                </h2>
                                <p className="text-2xl font-light mb-6">
                                    To experience our extraordinary sports
                                    coaching, we request you to provide the
                                    details below for getting in touch with you
                                    as soon as possible.
                                </p>
                                <h3 className="text-xl font-medium mb-6">
                                    Open Hours
                                </h3>
                                <p className="text-xl font-medium">
                                    Mon - Fri : 08.00 AM TO 09.00 PM
                                </p>
                                <br />
                                <p className="text-xl font-medium">
                                    Sat : 09.00 AM TO 06.00 PM
                                </p>
                                <br />
                                <p className="text-xl font-medium">
                                    Sunday : 09.00 AM TO 02.00 PM
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Parallax
                    className="parallax bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url(${image2})` }}
                    strength={-200}
                >
                    <div className="parallax-overlay"></div>
                    <div className="parallax-content max-w-screen-lg mx-auto py-16 text-white">
                        <h2 className="text-2xl font-semibold mb-8 uppercase flex items-center">
                            <strong>Product List</strong>{" "}
                            <FaArrowRightLong className="ml-4" />
                        </h2>
                        {productResponse?.data.map(
                            (product: TProducts, index: number) => (
                                <div
                                    key={`${product.id}-${index}`}
                                    className="flex justify-between items-center border-t py-2 text-xl w-full manage-product"
                                >
                                    <div className="flex justify-start w-[270px]">
                                        <span className="mr-3">
                                            {index + 1}.
                                        </span>
                                        <span>{product.name}</span>
                                    </div>
                                    <span>Price: {product.price}</span>
                                    <div>
                                        <Dialog>
                                            <DialogTrigger>
                                                <button className="mr-2 border-2 text-white px-2 hover:bg-white transition duration-700 ease-in-out hover:text-orange-800">
                                                    Edit
                                                </button>
                                            </DialogTrigger>
                                            <DialogContents
                                                product={product}
                                                handleUpdate={handleUpdate} // Pass handleUpdate function
                                            />
                                        </Dialog>
                                        <button className="border-2 text-white px-2 hover:bg-white transition duration-700 ease-in-out hover:text-orange-800">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </Parallax>
            </div>
        </>
    );
};

export default ManageProduct;
