// src/pages/CartPage.tsx
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

const CartPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const cartItems = useSelector((state: RootState) => selectCartItems(state));
    console.log(cartItems);
    const totalPrice = useSelector((state: RootState) =>
        selectCartTotalPrice(state)
    );
    const vat = 0.15;
    const totalPriceWithVAT = totalPrice * (1 + vat);

    const handleQuantityChange = (id: string, quantity: number) => {
        if (quantity < 1) return;

        dispatch(updateItemQuantity({ id, quantity }));
    };

    const handleRemove = (id: string) => {
        dispatch(removeFromCart(id));
    };

    const handleProceedToCheckout = () => {
        navigate("/checkout", { state: { cartItems, totalPriceWithVAT } });
    };

    return (
        <>
            <GlobalImage />
            <div className="bg-gradient-to-t from-amber-100 to-transparent py-10">
                <Table className="max-w-screen-lg mx-auto">
                    {cartItems.length === 0 ? (
                        <p className="text-xl text-center py-20 text-orange-700">
                            Your cart is empty.
                        </p>
                    ) : (
                        <>
                            <TableBody className="border-b-2 border-orange-800 ">
                                <h2 className="text-center text-orange-700 uppercase text-3xl font-semibold border-b-2 border-orange-800 pb-3">
                                    Cart list
                                </h2>
                                {cartItems.map((item, index) => (
                                    <TableRow
                                        key={item.id}
                                        className="flex justify-between items-center border-b-2 border-orange-800  "
                                    >
                                        <TableCell className="text-xl font-bold p-0 w-[50px] text-center">
                                            {index + 1}. {/* Serial Number */}
                                        </TableCell>
                                        <TableCell className="text-xl font-bold p-0 w-[300px]">
                                            {item.name}
                                        </TableCell>
                                        <TableCell className="text-xl">
                                            Price: ${item.price}
                                        </TableCell>
                                        <TableCell className="text-xl">
                                            In Stock: {item.stock}
                                        </TableCell>
                                        <TableCell
                                            className="bg-amber-800 text-xl text-white p-0 px-4 py-1 mr-2 cursor-pointer"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.stock - 1
                                                )
                                            }
                                        >
                                            -
                                        </TableCell>
                                        <TableCell className="mx-2 text-xl">
                                            {item.stock}
                                        </TableCell>
                                        <TableCell
                                            className="bg-amber-800 text-white p-0 px-4 py-2 cursor-pointer"
                                            onClick={() =>
                                                handleQuantityChange(
                                                    item.id,
                                                    item.stock + 1
                                                )
                                            }
                                        >
                                            +
                                        </TableCell>
                                        <TableCell
                                            className="bg-amber-800 text-white py-1 px-3 ml-4 text-xl cursor-pointer"
                                            onClick={() =>
                                                handleRemove(item.id)
                                            }
                                        >
                                            Remove
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <p className="text-xl font-bold mt-4">
                                        Total Price: ${totalPrice.toFixed(2)}
                                    </p>
                                    <p className="text-xl font-bold">
                                        Total Price with 15% VAT: $
                                        {totalPriceWithVAT.toFixed(2)}
                                    </p>
                                    <button
                                        className={`mt-4 bg-orange-800 uppercase hover:bg-orange-600 text-white py-2 px-4 ${
                                            cartItems.some(
                                                (item) => item.stock > 0
                                            )
                                                ? ""
                                                : "opacity-50 cursor-not-allowed"
                                        }`}
                                        disabled={
                                            !cartItems.some(
                                                (item) => item.stock > 0
                                            )
                                        }
                                        onClick={handleProceedToCheckout}
                                    >
                                        Proceed to Checkout
                                    </button>
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
