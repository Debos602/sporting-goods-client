import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TProducts } from "@/types";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { Star } from "lucide-react";
import { useInView } from "react-intersection-observer";

const ProductCard = ({
    product,
    index,
}: {
    product: TProducts;
    index: number;
}) => {
    const { _id, brand, description, image, name, price, stock, rating } =
        product;
    const getStarColor = (ratingValue: number) => {
        if (ratingValue >= 0 && ratingValue < 2) {
            return "#EF4444"; // Red
        } else if (ratingValue >= 2 && ratingValue < 3) {
            return "#F97316"; // OrangeD
        } else if (ratingValue >= 3 && ratingValue < 4) {
            return "#F59E0B"; // Yellow
        } else if (ratingValue >= 4 && ratingValue <= 5) {
            return "#F59E0B"; // Yellow
        }
        return "#F59E0B"; // Default Yellow
    };
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });
    const animationDelay = `${index * 50}ms`;

    return (
        <div
            ref={ref}
            className={`${inView ? "animate__animated animate__fadeInUp" : ""}`}
            style={{ animationDelay }}
        >
            {" "}
            <Card className="border-2 p-3 border-orange-800 hover:scale-105 duration-300 hover:bg-gradient-to-b  text-black shadow-orange-950 bg-gradient-to-t from-amber-200 to-amber-100 relative">
                <img
                    src={image}
                    className="object-contain max-h-[170px] w-full mb-2 "
                    alt={name}
                />
                <CardHeader className="p-0">
                    <CardTitle className="mb-2">
                        {name.substring(0, 17)}
                    </CardTitle>
                    <CardDescription>
                        <span className="font-semibold">Description:</span>{" "}
                        {description.substring(0, 20)}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mb-2">
                    <p className="text-md font-semibold">
                        Brand:{" "}
                        <span className="text-base">
                            {brand.substring(0, 4)}
                        </span>
                    </p>
                    <p className="text-md font-semibold">
                        Price: <span className="text-base">{price}</span>
                    </p>

                    <p className="text-md font-semibold">
                        Stock: <span className="text-base">{stock}</span>
                    </p>
                    <div className="flex items-center mb-2">
                        <span className=" text-gray-700 flex items-center">
                            <strong>Rating</strong>:{" "}
                            <div className=" mt-2 ms-2">
                                <Rating
                                    initialRating={rating} // Set initial rating value
                                    emptySymbol={
                                        <Star
                                            size={15}
                                            color={getStarColor(rating)}
                                        />
                                    }
                                    fullSymbol={
                                        <Star
                                            size={15}
                                            color={getStarColor(rating)}
                                            fill={getStarColor(rating)}
                                        />
                                    }
                                    fractions={2}
                                    readonly={true} // Ensure stars are not interactive
                                    stop={5}
                                />
                            </div>
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="p-0">
                    <Link
                        className="font-bold   uppercase border-2 hover:bg-white hover:text-orange-900 border-orange-900 bg-orange-500  w-full text-center"
                        to={`/cart/${_id}`}
                    >
                        Detailes view{" "}
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductCard;
