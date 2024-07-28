import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TProducts } from "@/types";

const ProductCard = ({ product }: { product: TProducts }) => {
    const { brand, description, image, name, price, stock, rating } = product;

    return (
        <Card className="w-full border-2 border-orange-800 text-black p-3 shadow-orange-950">
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
            <CardContent className="grid grid-cols-2 gap-1 p-0 mb-2">
                <p className="text-md font-semibold">
                    Brand:{" "}
                    <span className="text-base">{brand.substring(0, 3)}</span>
                </p>
                <p className="text-md font-semibold">
                    Price: <span className="text-base">{price}</span>
                </p>
                <p className="text-md font-semibold flex">Rating:{rating}</p>
                <p className="text-md font-semibold">
                    Stock: <span className="text-base">{stock}</span>
                </p>
            </CardContent>
            <CardFooter className="p-0">
                <Button
                    type="submit"
                    className="w-full font-bold p-0 uppercase border-2 border-orange-900 bg-orange-500 "
                >
                    View Details
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
