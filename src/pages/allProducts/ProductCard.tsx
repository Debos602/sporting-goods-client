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
            <Card className="border-2 p-3 border-orange-800 hover:scale-105 duration-300 hover:bg-gradient-to-b text-black shadow-orange-950 bg-white bg-opacity-50 relative">
                <img
                    src={image}
                    className="object-contain max-h-[170px] w-full mb-2"
                    alt={name}
                />
                <CardHeader className="p-0">
                    <CardTitle className="mb-2">
                        {name.length > 17
                            ? `${name.substring(0, 17)}...`
                            : name}
                    </CardTitle>
                    <CardDescription>
                        <span className="font-semibold">Description:</span>{" "}
                        {description.length > 20
                            ? `${description.substring(0, 15)}...`
                            : description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0 mb-2">
                    <p className="text-md font-semibold">
                        Brand:{" "}
                        <span className="text-base">
                            {brand.length > 4
                                ? `${brand.substring(0, 4)}...`
                                : brand}
                        </span>
                    </p>
                    <p className="text-md font-semibold">
                        Price: <span className="text-base">{price}</span>
                    </p>
                    <p className="text-md font-semibold">
                        Stock: <span className="text-base">{stock}</span>
                    </p>
                    <div className="flex items-center mb-2">
                        <strong className="text-gray-950 flex items-center">
                            Rating:
                        </strong>{" "}
                        <div className="mt-2 ms-2 ">
                            <Rating
                                initialRating={rating}
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
                                readonly={true}
                                stop={5}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-0">
                    <Link
                        className="font-bold text-xl py-1 uppercase border-2 bg-amber-50  hover:bg-white hover:text-orange-900 border-orange-900 w-full text-center"
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
