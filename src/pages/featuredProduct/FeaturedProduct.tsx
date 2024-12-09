import { FaRightLong } from "react-icons/fa6";
import { useGetProductQuery } from "@/redux/api/baseApi";
import FeaturedCards from "./FeaturedCards";
import { Parallax } from "react-parallax";
import image12 from "../../assets/images/image-12.avif";
import { TProducts } from "@/types";
import { useInView } from "react-intersection-observer";

const FeaturedProduct = () => {
    const { data: products, isLoading } = useGetProductQuery(
        {},
        {
            pollingInterval: 30000, // Poll every 30 seconds
        }
    );
    console.log(products);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    if (isLoading) {
        return (
            <p className="text-3xl text-center text-yellow-500 my-2 font-bold">
                Loading....
            </p>
        );
    }

    return (
        <>
            <Parallax
                className="parallax"
                style={{ backgroundImage: `url(${image12})` }}
                strength={-200}
            >
                <div className="parallax-overlay"></div>
                <div className="parallax-content max-w-screen-xl mx-auto py-11  md:py-16">
                    <div
                        ref={ref}
                        className={`flex items-center mb-10 ${inView ? "animate__animated animate__fadeInUp" : ""
                            }`}
                    >
                        <h2 className=" text-xl ps-5 xl:ps-0 md:text-2xl font-bold text-white uppercase">
                            Product Feature
                        </h2>
                        <FaRightLong className="ms-3 text-white" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-5 xl:px-0" id="featured-product">
                        {products?.data
                            ?.slice(0, 8)
                            .map(
                                (categoryProduct: TProducts, index: number) => (
                                    <FeaturedCards
                                        index={index}
                                        key={categoryProduct._id}
                                        categoryProduct={categoryProduct}

                                    />
                                )
                            )}
                    </div>
                </div>
            </Parallax>
        </>
    );
};

export default FeaturedProduct;
