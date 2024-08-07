import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TCategoryProducts } from "@/types";
import { Link } from "react-router-dom";
import Rating from "react-rating";
import { Star } from "lucide-react";
const FeaturedCards = ({
    categoryProduct,
}: {
    categoryProduct: TCategoryProducts;
}) => {
    const {
        brand,
        description,
        image,
        price,
        rating,
        stock,
        category,
        category_id,
    } = categoryProduct;
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
    return (
        <Card className="w-full border-2 border-orange-800 text-black p-3 hover:scale-105 duration-300 hover:bg-gradient-to-b shadow-orange-950 bg-gradient-to-t from-amber-200 to-amber-100 relative pb-10">
            <img
                src={image}
                className="object-contain max-h-[200px] w-full mb-2 "
                alt=""
            />
            <CardHeader className="p-0">
                <CardTitle className="mb-2">{category}</CardTitle>
                <CardDescription>
                    <span className="font-semibold">Description:</span>{" "}
                    {description.substring(0, 35)}...
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-1 p-0 mb-2">
                <p className="text-md font-semibold">
                    Brand: {brand.substring(0, 3)}
                </p>
                <p className="text-md font-semibold">Price: {price}</p>
                <p className="text-md font-semibold">Stock: {stock}</p>
                <div className="flex items-center mb-4">
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
                    className="font-bold p-0 uppercase border-2 absolute bottom-3 left-1/2 translate-x-[-50%] hover:bg-white hover:text-orange-900 border-orange-900 bg-orange-500 w-[295px] text-center py-1"
                    to={`category/${category_id}`}
                >
                    {" "}
                    View more
                </Link>
            </CardFooter>
        </Card>
    );
};

export default FeaturedCards;
