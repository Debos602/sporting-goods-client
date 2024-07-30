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
    // Add any other properties relevant to your cart item
}
export interface FormData {
    name: string;
    email: string;
    phone: string;
    address: string;
}
