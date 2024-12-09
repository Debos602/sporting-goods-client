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
import { RootState } from "../store";



export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://sportings-goods-server.vercel.app/api",
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token; // Adjust based on your state structure
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["category", "product", "order", "auth"],
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
            query: (category_id) => `/all-products/${category_id}`,
            providesTags: (result, _error, category_id) =>
                result ? [{ type: "product", id: category_id }] : [],
        }),
        getSingleProduct: builder.query<TProductDetails, string>({
            query: (_id) => `/all-product/${_id}`,
            providesTags: (result, _error, _id) =>
                result ? [{ type: "product", id: _id }] : [],
        }),
        createProduct: builder.mutation<TProductResponse, TCreateProductRequest>({
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
        getAllOrder: builder.query<TOrderResponse, string>({
            query: () => ({
                url: "/all-orders",
                method: "GET",
            }),
            providesTags: ["order"],
        }),
        deleteProduct: builder.mutation<TDeleteProductResponse, string>({
            query: (id) => ({
                url: `/all-product/${id}`,
                method: "DELETE",
            }),
            // Optionally, you can invalidate cache or refetch data here if needed
            invalidatesTags: ["product"], // Adjust based on your needs
        }),
        updateProduct: builder.mutation<void, { id: string; data: Partial<TUpdateProductRequest>; }>({
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
        signUp: builder.mutation({
            query: (data) => ({
                url: "/auth/signup",
                method: "POST",
                body: data,
            }),
        }),
        logIn: builder.mutation({
            query: (data) => ({
                url: "/auth/signin",
                method: "POST",
                body: data,
            }),
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "/auth/all-users",
                method: "GET"
            }),
            providesTags: ["auth"],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/auth/delete-user/${userId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["auth"],
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/auth/update-user`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["auth"],
        })

    }),
});

export const {
    useGetCategoryQuery,
    useGetProductQuery,
    useGetGroupProductQuery,
    useGetSingleProductQuery,
    useCreateOrderMutation,
    useUpdateProductMutation,
    useLazyGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
    useSignUpMutation,
    useLogInMutation,
    useGetAllOrderQuery,
    useGetAllUserQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} = baseApi;
