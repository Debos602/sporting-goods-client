import { TCategoryProducts } from "@/types";
import { FaRightLong } from "react-icons/fa6";
import { useGetCategoryQuery } from "@/redux/api/baseApi";
import FeaturedCards from "./FeaturedCards";

const FeaturedProduct = () => {
    const { data: categories, isLoading } = useGetCategoryQuery({});
    console.log(categories);
    if (isLoading)
        return (
            <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
                Loading....
            </p>
        );
    return (
        <div className="bg-amber-50 py-4 md:py-8 lg:py-8 px-5 ">
            <div className=" mt-5 max-w-screen-lg mx-auto ">
                <div className="flex items-center mb-5">
                    <h2 className="text-2xl font-bold text-orange-900 uppercase">
                        Latest product
                    </h2>
                    <FaRightLong className="ms-3 text-orange-900" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.data
                        ?.slice(0, 6)
                        .map((categoryProduct: TCategoryProducts) => (
                            <FeaturedCards
                                key={categoryProduct.category_id}
                                categoryProduct={categoryProduct}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;
