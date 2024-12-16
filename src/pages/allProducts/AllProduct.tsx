import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import { TProducts } from "@/types";
import { useGetProductQuery, useGetGroupProductQuery } from "@/redux/api/baseApi";
import GlobalImage from "../Shared/globalImage/GlobalImage";
import image12 from "../../assets/images/image-12.avif";
import { Parallax } from "react-parallax";
import useNav from "@/hooks/UserNav";


const AllProduct = () => {
    const { id: category_id } = useParams<{ id: string; }>();

    // Fetch all products or grouped products based on the URL parameter
    const { data: allProducts, isLoading: allLoading } = useGetProductQuery({
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
    });
    const { data: groupedProducts, isLoading: groupLoading } = useGetGroupProductQuery(
        category_id as string,
        { skip: !category_id }
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        category: "",
        brand: "",
        rating: "",
        priceRange: [0, 1000],
    });
    const [sortOrder, setSortOrder] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useNav(category_id ? `Category: ${category_id}` : "All Products");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const clearFilters = () => {
        setFilters({
            category: "",
            brand: "",
            rating: "",
            priceRange: [0, 1000],
        });
        setSortOrder("");
        setSearchTerm("");
    };
    const handleFilterChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(event.target.value);
    };

    const productsToDisplay = category_id ? groupedProducts?.data : allProducts?.data;

    const filteredProducts = productsToDisplay
        ?.filter((product: TProducts) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((product: TProducts) =>
            filters.category ? product.category === filters.category : true
        )
        .filter((product: TProducts) =>
            filters.brand ? product.brand === filters.brand : true
        )
        .filter((product: TProducts) =>
            filters.rating ? product.rating >= Number(filters.rating) : true
        )
        .filter(
            (product: TProducts) =>
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1]
        )
        .sort((a: TProducts, b: TProducts) => {
            if (sortOrder === "asc") {
                return a.price - b.price;
            } else if (sortOrder === "desc") {
                return b.price - a.price;
            }
            return 0;
        });

    const paginatedProducts = filteredProducts?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);
    const isLoading = category_id ? groupLoading : allLoading;

    if (isLoading)
        return (
            <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
                Loading....
            </p>
        );

    return (
        <>
            <GlobalImage />
            <Parallax
                className="parallax"
                style={{ backgroundImage: `url(${image12})` }}
                strength={-200}
            >
                <div className="parallax-overlay"></div>
                <div className="parallax-content max-w-screen-xl mx-auto py-16 px-5 xl:px-0">
                    <div className="mb-8 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 gap-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search by name"
                            className="p-2 border-2 w-full md:w-1/5 bg-amber-100 text-black border-orange-800"
                        />
                        <select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            className="p-2 border bg-amber-100 text-black border-orange-800 w-full md:w-1/5"
                        >
                            <option value="">All Categories</option>
                            <option value="Football">Football</option>
                            <option value="Yoga">Yoga</option>
                            <option value="Running">Running</option>
                            <option value="Tennis">Tennis</option>
                            <option value="Badminton">Badminton</option>
                            <option value="Squash">Squash</option>
                        </select>
                        <select
                            name="brand"
                            value={filters.brand}
                            onChange={handleFilterChange}
                            className="p-2 border bg-amber-100 text-black border-orange-800 w-full md:w-1/5"
                        >
                            <option value="">All Brands</option>
                            <option value="Adidas">Adidas</option>
                            <option value="Nike">Nike</option>
                            <option value="Wilson">Wilson</option>
                            <option value="Gaiam">Gaiam</option>
                            <option value="Fitbit">Fitbit</option>
                            <option value="Bowflex">Bowflex</option>
                            <option value="Asics">Asics</option>
                            <option value="Mgs">Mgs</option>
                            <option value="Callaway">Callaway</option>
                            <option value="Titleist">Titleist</option>
                            <option value="Yonex">Yonex</option>
                            <option value="Prince">Prince</option>
                            <option value="New Balance">New Balance</option>
                        </select>
                        <select
                            name="rating"
                            value={filters.rating}
                            onChange={handleFilterChange}
                            className="p-2 border bg-amber-100 text-black border-orange-800 w-full md:w-1/5"
                        >
                            <option value="">All Ratings</option>
                            <option value="5.0">up to 5.0+</option>
                            <option value="4.8">up to 4.8+</option>
                            <option value="4.5">up to 4.5+</option>
                            <option value="4.3">up to 4.3+</option>
                            <option value="4.0">up to 4.0+</option>
                            <option value="3.9">up to 3.9+</option>
                            <option value="3.5">up to 3.5+</option>
                        </select>
                        <select
                            name="sortOrder"
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="p-2 border bg-amber-100 text-black border-orange-800 w-full md:w-1/5"
                        >
                            <option value="">Sort by Price</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <button
                            onClick={clearFilters}
                            className="p-2 bg-orange-950 uppercase border-2 border-white text-white w-full md:w-1/5 hover:bg-white hover:border-orange-800 hover:text-orange-800"
                        >
                            Clear Filters
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {paginatedProducts?.map((product: TProducts, index: number) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-8 w-full">
                        <Link to="/all-product" className="p-2 px-4 border bg-orange-800 text-white hover:bg-orange-600">show All</Link>
                        <div className="flex items-center justify-center">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`p-2 px-4 border ${currentPage === 1
                                    ? "bg-orange-300 text-gray-950 cursor-not-allowed"
                                    : "bg-orange-800 text-white hover:bg-orange-600"
                                    }`}
                            >
                                Prev
                            </button>
                            <p className="mx-4 text-lg text-amber-50">
                                Page {currentPage} of {totalPages}
                            </p>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }
                                disabled={currentPage === totalPages}
                                className={`p-2 px-4 border ${currentPage === totalPages
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-orange-800 text-white hover:bg-orange-600"
                                    }`}
                            >
                                Next
                            </button>
                        </div>

                    </div>

                </div>
            </Parallax>
        </>
    );
};

export default AllProduct;
