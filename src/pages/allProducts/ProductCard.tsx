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
        if (ratingValue < 2) {
            return "#EF4444"; // Red
        } else if (ratingValue < 3) {
            return "#F97316"; // Orange
        } else if (ratingValue < 4) {
            return "#F59E0B"; // Yellow
        } else {
            return "#F59E0B"; // Default Yellow
        }
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
            <Card className="border-2 border-opacity-40 p-4 border-orange-950 hover:scale-105 duration-300 hover:bg-gradient-to-b text-black shadow-xl bg-white bg-opacity-95 relative rounded-lg overflow-hidden">
                <div className="relative">
                    <div className="flex justify-center items-center">
                        <img
                            src={image}
                            className="object-cover max-h-full h-32 mb-4"
                            alt={name}
                        />
                    </div>
                    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {rating}★
                    </span>
                </div>
                <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-lg font-semibold text-orange-900 truncate">
                        {name.length > 17 ? `${name.substring(0, 17)}...` : name}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                        {description.length > 20
                            ? `${description.substring(0, 20)}...`
                            : description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mb-3">
                    <div className="flex justify-between items-center">
                        <p className="text-md font-semibold text-gray-700">
                            Brand:{" "}
                            <span className="text-base text-gray-500">
                                {brand.length > 4 ? `${brand.substring(0, 6)}...` : brand}
                            </span>
                        </p>
                        <p className="text-md font-semibold text-gray-700">
                            Price:{" "}
                            <span className="text-base text-green-500">{price}$</span>
                        </p>
                    </div>
                    <div className="flex justify-between items-center ">
                        <p className="text-md font-semibold text-gray-700">
                            Stock:{" "}
                            <span className="text-base text-gray-500">{stock}</span>
                        </p>
                    </div>
                    <div className="flex items-center mb-3">
                        <strong className="text-gray-700">Rating:</strong>{" "}
                        <div className="mt-2 ms-2">
                            <Rating
                                initialRating={rating}
                                emptySymbol={
                                    <Star size={15} color={getStarColor(rating)} />
                                }
                                fullSymbol={
                                    <Star size={15} color={getStarColor(rating)} fill={getStarColor(rating)} />
                                }
                                fractions={2}
                                readonly={true}
                                stop={5}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-0">
                    <Link
                        className="font-medium text-lg p-0 border bg-amber-50  hover:bg-white duration-700 border-orange-950 w-full text-center py-1"
                        to={`/cart/${_id}`}
                    >
                        View Details
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductCard;
