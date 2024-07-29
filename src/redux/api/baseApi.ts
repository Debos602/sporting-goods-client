import { TProductDetails, TProductsResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: "baseApi", // Unique name for the API reducer
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api", // Base URL for the API
    }),
    tagTypes: ["category", "product"], // Define tagTypes for caching and invalidation
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => ({
                url: "/category", // Endpoint for fetching categories
                method: "GET", // HTTP method
            }),
            providesTags: ["category"], // Tags for cache invalidation
        }),
        getProduct: builder.query({
            query: () => ({
                url: "/all-product", // Endpoint for fetching all products
                method: "GET", // HTTP method
            }),
            providesTags: ["product"], // Tags for cache invalidation
        }),
        getGroupProduct: builder.query<TProductsResponse, string>({
            query: (category_id) => ({
                url: `/category/${category_id}`, // Endpoint for fetching products by category
                method: "GET", // HTTP method
            }),
            providesTags: (result, error, category_id) =>
                result ? [{ type: "product", id: category_id }] : [],
            // Use providesTags with a dynamic tag based on category_id
        }),
        getSingleProduct: builder.query<TProductDetails, string>({
            query: (_id) => ({
                url: `/all-products/${_id}`, // Endpoint for fetching products by category
                method: "GET", // HTTP method
            }),
            providesTags: (result, error, _id) =>
                result ? [{ type: "product", id: _id }] : [],
            // Use providesTags with a dynamic tag based on category_id
        }),
    }),
});

// Export hooks for usage in functional components
export const {
    useGetCategoryQuery,
    useGetProductQuery,
    useGetGroupProductQuery,
    useGetSingleProductQuery,
} = baseApi;
