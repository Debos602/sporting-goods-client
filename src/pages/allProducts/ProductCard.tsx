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

const ProductCard = ({ product }: { product: TProducts }) => {
    console.log(product);
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

    return (
        <Card className="w-full border-2 border-orange-800 text-black p-3 shadow-orange-950 bg-gradient-to-t from-amber-200 to-transparent">
            <img
                src={image}
                className="object-contain max-h-[250px] w-full mb-2 "
                alt={name}
            />
            <CardHeader className="p-0">
                <CardTitle className="mb-2">{name}</CardTitle>
                <CardDescription>
                    <span className="font-semibold">Description:</span>{" "}
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mb-2">
                <p className="text-md font-semibold">
                    Brand:{" "}
                    <span className="text-base">{brand.substring(0, 4)}</span>
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
                    className="font-bold p-0 uppercase border-2 hover:bg-white hover:text-orange-900 border-orange-900 bg-orange-500 w-full text-center py-1"
                    to={`/cart/${_id}`}
                >
                    Detailed view{" "}
                </Link>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
