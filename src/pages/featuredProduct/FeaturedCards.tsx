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
    return (
        <Card className="w-full border-2 border-orange-800 text-black p-3 shadow-orange-950">
            <img
                src={image}
                className="object-contain max-h-[250px] w-full mb-2 "
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
                <p className="text-md font-semibold">Rating: {rating}</p>
                <p className="text-md font-semibold">Stock: {stock}</p>
            </CardContent>
            <CardFooter className="p-0">
                <Link
                    className="font-bold p-0 uppercase border-2 hover:bg-white hover:text-orange-900 border-orange-900 bg-orange-500 w-full text-center py-1"
                    to={`all-products/${category_id}`}
                >
                    {" "}
                    View more
                </Link>
            </CardFooter>
        </Card>
    );
};

export default FeaturedCards;
