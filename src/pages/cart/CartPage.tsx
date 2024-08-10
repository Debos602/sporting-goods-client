import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import {
    removeFromCart,
    updateItemQuantity,
    selectCartItems,
    selectCartTotalPrice,
} from "@/redux/cartSlice";
import {
    TableBody,
    TableRow,
    TableCell,
    Table,
    TableFooter,
} from "@/components/ui/table";
import GlobalImage from "../Shared/globalImage/GlobalImage";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import useNav from "@/hooks/UserNav";

const CartPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => selectCartItems(state));
    const totalPrice = useSelector((state: RootState) =>
        selectCartTotalPrice(state)
    );
    const vat = 0.15;
    const totalPriceWithVAT = totalPrice * (1 + vat);

    useNav("Cart-Page");

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity < 1) return;
        dispatch(updateItemQuantity({ id, quantity }));
    };

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
        toast.success("Item removed from cart", {
            position: "top-center",
            style: {
                background: "#451a03",
                color: "white",
                fontWeight: "bold",
                fontSize: "1rem",
                border: "2px solid white",
            },
        });
    };

    const handleProceedToCheckout = () => {
        navigate("/checkout", { state: { cartItems, totalPriceWithVAT } });
    };

    return (
        <>
            <GlobalImage />
            <div className="bg-amber-200 bg-opacity-50 py-10 bg-shad">
                <Table className="max-w-screen-lg mx-auto w-full px-4 sm:px-6 lg:px-8">
                    {cartItems.length === 0 ? (
                        <span className="text-xl sm:text-2xl text-center py-20 text-orange-700">
                            Your cart is empty.
                        </span>
                    ) : (
                        <>
                            <thead>
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="text-center text-orange-700 uppercase text-2xl sm:text-3xl font-semibold border-b-2 border-orange-800 pb-3"
                                    >
                                        Cart list
                                    </TableCell>
                                </TableRow>
                            </thead>
                            <TableBody className="border-b-2 border-orange-800">
                                {cartItems.map((item, index) => (
                                    <TableRow
                                        key={item.id}
                                        className="flex flex-col lg:flex-row justify-between items-center w-full border-b-2 border-orange-800 py-4 sm:py-2 px-4"
                                    >
                                        <TableCell className="text-lg sm:text-xl font-bold p-0 w-full sm:w-auto text-center mb-2 sm:mb-0">
                                            {index + 1}.
                                        </TableCell>
                                        <TableCell className="text-lg sm:text-xl font-bold p-0 w-full sm:w-[300px] text-center xl:text-left sm:text-center mb-2 sm:mb-0">
                                            {item.name}
                                        </TableCell>
                                        <TableCell className="text-lg sm:text-xl text-center sm:text-left mb-2 sm:mb-0">
                                            Price: ${item.price}
                                        </TableCell>
                                        <TableCell className="text-lg sm:text-xl text-center sm:text-left mb-2 sm:mb-0">
                                            Count: {item.stock}
                                        </TableCell>
                                        <TableCell className="flex items-center mb-2 sm:mb-0">
                                            <Button
                                                className="bg-amber-800 text-lg sm:text-2xl hover:text-orange-800 border-2 border-orange-800 text-white p-2 sm:px-4 sm:py-1 mr-2 cursor-pointer"
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.stock - 1
                                                    )
                                                }
                                            >
                                                -
                                            </Button>
                                            <span className="text-lg sm:text-xl mx-2 text-center sm:text-left">
                                                In Stock: {item.quantity}
                                            </span>
                                            <Button
                                                className="text-lg sm:text-xl bg-amber-800 hover:text-orange-800 border-2 border-orange-800 text-white px-4 py-2 cursor-pointer disabled:opacity-50"
                                                onClick={() =>
                                                    handleQuantityChange(
                                                        item.id,
                                                        item.stock + 1
                                                    )
                                                }
                                                disabled={item.stock <= 0}
                                            >
                                                +
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                className="bg-amber-800 hover:text-orange-800 border-2 border-orange-800 text-white py-2 px-3 text-lg sm:text-xl cursor-pointer"
                                                onClick={() =>
                                                    handleRemove(item.id)
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter className="text-center">
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <p className="text-lg sm:text-xl font-bold mt-4">
                                            Total Price: $
                                            {totalPrice.toFixed(2)}
                                        </p>
                                        <p className="text-lg sm:text-xl font-bold">
                                            Total Price with 15% VAT: $
                                            {totalPriceWithVAT.toFixed(2)}
                                        </p>
                                        <Button
                                            className={`mt-4 bg-orange-800 uppercase text-white hover:bg-white hover:text-orange-700 py-2 px-4 duration-500 border-2 border-orange-800 font-bold ${
                                                cartItems.some(
                                                    (item) => item.quantity > 0
                                                )
                                                    ? ""
                                                    : "opacity-50 cursor-not-allowed"
                                            }`}
                                            disabled={
                                                !cartItems.some(
                                                    (item) => item.quantity > 0
                                                )
                                            }
                                            onClick={handleProceedToCheckout}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </>
                    )}
                </Table>
            </div>
        </>
    );
};

export default CartPage;
