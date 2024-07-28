export type TProducts = {
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
// src/types/react-rating-stars-component.d.ts

export interface ReactStarsProps {
    count?: number;
    value?: number;
    onChange?: (newValue: number) => void;
    size?: number;
    activeColor?: string;
    isHalf?: boolean;
    emptyIcon?: React.ReactNode;
    filledIcon?: React.ReactNode;
    halfIcon?: React.ReactNode;
    edit?: boolean;
}
