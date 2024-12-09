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

export type TOrderResponse = {
    data: {
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
        _id: string;
        status?: string;
        createdAt: string;
        updatedAt: string;
    }[];
};




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
export interface FeaturedCardsProps {
    categoryProduct: TProducts;
    index: number;
}
export type TUser = {
    name: string;
    email: string;
    role: 'user' | 'admin';
    password?: string;
    confirmPassword?: string;
    needsPasswordChange?: boolean;
    passwordChangedAt?: Date;
    phone?: string;
    nid?: string;
    drivingLicense?: string;
    features?: string[];
    createdAt?: Date;
    updatedAt?: Date;
};
