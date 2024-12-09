import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { Star } from "lucide-react";
import { FeaturedCardsProps } from "@/types";
import { useInView } from "react-intersection-observer";

const FeaturedCards = ({ categoryProduct, index }: FeaturedCardsProps) => {
    const {
        brand,
        image,
        rating,
        category,
        category_id,
    } = categoryProduct;

    const getStarColor = (ratingValue: number) => {
        if (ratingValue >= 0 && ratingValue < 2) {
            return "#EF4444"; // Red
        } else if (ratingValue >= 2 && ratingValue < 3) {
            return "#F97316"; // Orange
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
            <Card className="w-full border-2 border-orange-950 text-black p-3 hover:scale-105 duration-300  shadow-orange-950 bg-white bg-opacity-50 relative pb-3">
                <img
                    src={image}
                    className="object-contain max-h-[200px] h-full w-full mb-2"
                    alt=""
                />
                <CardHeader className="p-0">
                    <CardTitle className="mb-2">{category}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <p className="text-md font-semibold">
                        Brand: {brand.substring(0, 3)}
                    </p>
                    <div className="flex items-center mb-4">
                        <span className="text-gray-950 flex items-center">
                            <strong>Rating</strong>:{" "}
                            <div className="mt-2 ms-2">
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
                        </span>
                    </div>
                </CardContent>
                <CardFooter className="p-0">
                    <Link
                        className="font-medium text-xl p-0 uppercase border-2 bg-amber-50  hover:bg-white duration-700 border-orange-950 w-full text-center py-2"
                        to={`/all-products/${category_id}`}
                    >
                        {" "}
                        View more
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default FeaturedCards;
