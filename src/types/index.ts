// Product-related types
export type TProducts = {
    _id: string;
    id: string;
    name: string;
    category_id: number;
    category: string;
    stock: number;
    description: string;
    brand: string;
    rating: number;
    price: number;
    image: string;
};

export type TCreateProductRequest = {
    product: {
        id: string;
        name: string;
        category_id: number;
        category: string;
        stock: number;
        description: string;
        brand: string;
        rating: number;
        price: number;
        image: string; // This will be the image URL after upload
    };
};
// API response types
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

export interface TProductResponse {
    success: boolean;
    data: TProducts; // Assuming a single product object is returned
}

export interface TDeleteProductResponse {
    success: boolean;
    message: string; // Optional: a message from the server
}

// Order-related types
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

// Other types
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
    termsAgreed: boolean;
}
export type TUpdateProductRequest = {
    id?: string;
    name?: string;
    category_id?: number;
    category?: string;
    stock?: number;
    description?: string;
    brand?: string;
    rating?: number;
    price?: number;
    image?: string;
    // Add other fields if necessary
};
// types.ts
