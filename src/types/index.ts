export type TProducts = {
    _id: string;
    id: string;
    name: string;
    category_id: number;
    category: string;
    stock: number;
    brand: string;
    rating: number;
    description: string;
    price: number;
    image: string;
};

export type TCategoryProducts = {
    _id: string;
    category_id: number;
    name: string;
    category: string;
    stock: number;
    brand: string;
    rating: number;
    description: string;
    price: number;
    image: string;
};
export interface TProductsResponse {
    success: boolean;
    data: TProducts[];
}
export interface TProductDetails {
    data: {
        id: string;
        name: string;
        description: string;
        category: string;
        brand: string;
        stock: number;
        rating: number;
        price: number;
        image: string;
    };
}
export interface CartState {
    items: CartItem[];
}
export interface CartItem {
    id: string;
    name: string;
    stock: number;
    price: number;
    quantity: number;
    // Add any other properties relevant to your cart item
}
export interface FormData {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
}
// src/types/index.ts

export interface TOrderRequest {
    items: Array<{
        id: string;
        name: string;
        price: number;
        stock: number;
    }>;
    totalPriceWithVAT: number;
    userDetails: {
        id: string;
        name: string;
        email: string;
        paymentMethod: string;
        phone: string;
        address: string;
    };
    status?: string; // Optional
}

export interface TOrderResponse {
    items: Array<{
        id: string;
        name: string;
        price: number;
        stock: number;
    }>;
    totalPriceWithVAT: number;
    userDetails: {
        id: string;
        name: string;
        email: string;
        paymentMethod: string;
        phone: string;
        address: string;
    };
    status?: string;
    createdAt: string; // ISO 8601 date string
    updatedAt: string; // ISO 8601 date string
}
export type TUpdateProductRequest = {
    stock?: number;
    price?: number;
    rating?: number;
    // Add other fields if necessary
};
