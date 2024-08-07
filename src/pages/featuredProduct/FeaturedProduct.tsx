import { TCategoryProducts } from "@/types";
import { FaRightLong } from "react-icons/fa6";
import { useGetCategoryQuery } from "@/redux/api/baseApi";
import FeaturedCards from "./FeaturedCards";
import { Parallax } from "react-parallax";
import image12 from "../../assets/images/image-12.avif";

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
        <Parallax
            className="parallax "
            style={{ backgroundImage: `url(${image12})` }}
            strength={-200}
        >
            <div className="parallax-overlay"></div>
            <div className="parallax-content max-w-screen-lg mx-auto py-16 ">
                <div className="flex items-center mb-5">
                    <h2 className="text-2xl font-bold text-white uppercase">
                        Latest product
                    </h2>
                    <FaRightLong className="ms-3 text-white hover:rotate-90  duration-700" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </Parallax>
    );
};

export default FeaturedProduct;
