import { useState } from "react";
import { baseApi, useDeleteProductMutation, useGetProductQuery, useUpdateProductMutation } from '@/redux/api/baseApi';
import { TProducts } from '@/types';
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useInView } from 'react-intersection-observer';
import { FaArrowRightLong } from "react-icons/fa6";
import DialogContents from '../manageProduct/DialogContents';

const IMGBB_API_KEY = "09bd3d3e0869a6943ef1ad6d74606666";

const ProductsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    const { data: productResponse, refetch } = useGetProductQuery(
        {},
        {
            refetchOnMountOrArgChange: true,
        }
    );
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const totalProducts = productResponse?.data?.length || 0;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const productsToShow = productResponse?.data.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    const handleUpdate = async (product: TProducts) => {
        try {
            let imageUrl = "";

            if (product?.image && product?.image[0]) {
                const formData = new FormData();
                formData.append("image", product?.image[0]);

                const response = await fetch(
                    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );

                const result = await response.json();
                imageUrl = result?.data?.url;
            }

            const updatedRequest = {
                id: product._id,
                data: {
                    name: product.name,
                    price: product.price,
                    description: product.description,
                    category: product.category,
                    category_id: product.category_id,
                    stock: product.stock,
                    brand: product.brand,
                    rating: product.rating,
                    image: imageUrl || product.image,
                },
            };

            await updateProduct(updatedRequest).unwrap();
            setTimeout(() => {
                refetch();
            }, 1000);
            toast.success("Product updated successfully", {
                position: "top-center",
                style: {
                    background: "#451a03",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    border: "2px solid white",
                },
            });
            baseApi.util.invalidateTags(["product"]);
            refetch();
        } catch (error) {
            console.error("Update product error:", error);
            toast.error("Failed to update product");
        }
    };

    const handleDelete = async (productId: string) => {
        try {
            if (window.confirm("Are you sure you want to delete this product?")) {
                await deleteProduct(productId).unwrap(); // Call delete mutation
                toast.success("Product deleted successfully!", {
                    position: "top-center",
                    style: {
                        background: "#451a03",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        border: "2px solid white",
                    },
                });
                refetch(); // Refetch products to update the UI
            }
        } catch (error) {
            console.error("Delete product error:", error);
            toast.error("Failed to delete product", {
                position: "top-center",
                style: {
                    background: "#451a03",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    border: "2px solid white",
                },
            });
        }
    };

    const { inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    return (
        <div className="container mx-auto py-5 text-amber-950 h-screen">
            <h2 className="text-2xl font-semibold mb-5 uppercase flex items-center px-5 xl:px-0">
                <strong className={`${inView ? "animate__animated animate__fadeInUp" : ""}`}>
                    Product List
                </strong>
                <FaArrowRightLong className="ml-4" />
            </h2>

            <div className="overflow-x-auto px-5 xl:px-0">
                <table className="min-w-full table-auto border-collapse border-2 border-amber-950">
                    <thead>
                        <tr className="text-left bg-amber-950">
                            <th className="px-4 py-2 text-base font-semibold text-amber-50">Image</th>
                            <th className="px-4 py-2 text-base font-semibold text-amber-50">Name</th>
                            <th className="px-4 py-2 text-base font-semibold text-amber-50">Price</th>
                            <th className="px-4 py-2 text-base font-semibold text-amber-50">Stock</th>
                            <th className="px-4 py-2 text-base font-semibold text-amber-50">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsToShow?.map((product: TProducts, index: number) => (
                            <tr
                                key={product._id}
                                className={`border border-amber-950 hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : ""}`}
                            >
                                <td className="px-4 py-2 text-base text-center">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td className="px-4 py-2 text-base">{product.name}</td>
                                <td className="px-4 py-2 text-base">{product.price}</td>
                                <td className="px-4 py-2 text-base">{product.stock}</td>
                                <td className="px-4 py-2 text-base flex items-center mt-2 space-x-4">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <button className="mr-2 border-2 text-amber-950 px-2 hover:bg-white transition duration-700 ease-in-out hover:text-orange-800">
                                                Edit
                                            </button>
                                        </DialogTrigger>
                                        <DialogContents product={product} handleUpdate={handleUpdate} />
                                    </Dialog>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="border-2 text-amber-950 px-2 hover:bg-white transition duration-700 ease-in-out hover:text-orange-800"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-5 space-x-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 border rounded ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}`}
                >
                    Prev
                </button>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded ${currentPage === totalPages ? "cursor-not-allowed opacity-50" : "hover:bg-gray-100"}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductsPage;
