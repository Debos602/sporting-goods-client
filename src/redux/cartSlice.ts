// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types";

const initialState = {
    items: [] as CartItem[],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (existingItem) {
                if (existingItem.stock < action.payload.stock) {
                    existingItem.stock += 1;
                }
            } else {
                state.items.push({ ...action.payload, stock: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        updateItemQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((item) => item.id === id);
            if (item) {
                item.stock = quantity;
            }
        },
    },
});

// Action creators
export const { addToCart, removeFromCart, updateItemQuantity } =
    cartSlice.actions;

// Selector to get all cart items
export const selectCartItems = (state: { cart: { items: CartItem[] } }) =>
    state.cart.items;

// Selector to get total cart price
export const selectCartTotalPrice = (state: { cart: { items: CartItem[] } }) =>
    state.cart.items.reduce(
        (total, item) => total + item.price * item.stock,
        0
    );

// **Selector to get total number of items in cart**
export const selectCartCount = (state: { cart: { items: CartItem[] } }) =>
    state.cart.items.reduce((count, item) => count + item.stock, 0);

export default cartSlice.reducer;
