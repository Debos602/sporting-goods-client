import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    TProductDetails,
    TOrderRequest,
    TOrderResponse,
    TUpdateProductRequest,
    TProductResponse,
    TCreateProductRequest,
    TDeleteProductResponse,
    TProductsResponse,
} from "@/types";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://sportings-goods-server.vercel.app/api",
    }),
    tagTypes: ["category", "product"],
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => "/category",
            providesTags: ["category"],
        }),
        getProduct: builder.query({
            query: () => "/all-product",
            providesTags: ["product"],
        }),
        getGroupProduct: builder.query<TProductsResponse, string>({
            query: (category_id) => `/category/${category_id}`,
            providesTags: (result, _error, category_id) =>
                result ? [{ type: "product", id: category_id }] : [],
        }),
        getSingleProduct: builder.query<TProductDetails, string>({
            query: (_id) => `/all-product/${_id}`,
            providesTags: (result, _error, _id) =>
                result ? [{ type: "product", id: _id }] : [],
        }),
        createProduct: builder.mutation<
            TProductResponse,
            TCreateProductRequest
        >({
            query: (newProduct) => ({
                url: "/create-product",
                method: "POST",
                body: newProduct,
            }),
            invalidatesTags: ["product"],
        }),
        createOrder: builder.mutation<TOrderResponse, TOrderRequest>({
            query: (newOrder) => ({
                url: "/orders",
                method: "POST",
                body: newOrder,
            }),
        }),
        deleteProduct: builder.mutation<TDeleteProductResponse, string>({
            query: (id) => ({
                url: `/all-product/${id}`,
                method: "DELETE",
            }),
            // Optionally, you can invalidate cache or refetch data here if needed
            invalidatesTags: ["product"], // Adjust based on your needs
        }),
        updateProduct: builder.mutation<
            void,
            { id: string; data: Partial<TUpdateProductRequest> }
        >({
            query: ({ id, data }) => ({
                url: `/all-product/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [
                { type: "product", id },
            ],
        }),
        // Define a lazy query if needed
        getProducts: builder.query<TProductsResponse, void>({
            query: () => "/all-product",
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useGetProductQuery,
    useGetGroupProductQuery,
    useGetSingleProductQuery,
    useCreateOrderMutation,
    useUpdateProductMutation,
    useLazyGetProductsQuery, // Export the lazy query
    useCreateProductMutation,
    useDeleteProductMutation,
} = baseApi;
