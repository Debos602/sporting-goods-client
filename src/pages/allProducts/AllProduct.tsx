import { useState } from "react";
import ProductCard from "./ProductCard";
import { TProducts } from "@/types";
import { useGetProductQuery } from "@/redux/api/baseApi";
import GlobalImage from "../Shared/globalImage/GlobalImage";
import image12 from "../../assets/images/image-12.avif";
import { Parallax } from "react-parallax";

const AllProduct = () => {
    const { data: products, isLoading } = useGetProductQuery({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        category: "",
        brand: "",
        rating: "",
        priceRange: [0, 1000],
    });
    const [sortOrder, setSortOrder] = useState("");

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
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

    const filteredProducts = products?.data
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
                strength={-200} // Adjust strength as needed
            >
                <div className="parallax-overlay"></div>
                <div className="parallax-content max-w-screen-lg mx-auto py-16">
                    <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 gap-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search by name"
                            className="p-2 border-2  w-full md:w-1/5 bg-amber-100 text-black border-orange-800"
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
                            className="p-2 bg-orange-800 uppercase border-2 border-white text-white w-full md:w-1/5 hover:bg-white hover:border-orange-800 hover:text-orange-800"
                        >
                            Clear Filters
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts?.map(
                            (product: TProducts, index: number) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                />
                            )
                        )}
                    </div>
                </div>
            </Parallax>
        </>
    );
};

export default AllProduct;
