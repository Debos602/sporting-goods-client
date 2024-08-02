import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    TProductDetails,
    TProductsResponse,
    TOrderRequest,
    TOrderResponse,
    TUpdateProductRequest,
} from "@/types";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api",
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
            providesTags: (result, error, category_id) =>
                result ? [{ type: "product", id: category_id }] : [],
        }),
        getSingleProduct: builder.query<TProductDetails, string>({
            query: (_id) => `/all-product/${_id}`,
            providesTags: (result, error, _id) =>
                result ? [{ type: "product", id: _id }] : [],
        }),
        createOrder: builder.mutation<TOrderResponse, TOrderRequest>({
            query: (newOrder) => ({
                url: "/orders",
                method: "POST",
                body: newOrder,
            }),
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
            invalidatesTags: (result, error, { id }) => [
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
} = baseApi;
