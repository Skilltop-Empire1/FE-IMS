import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://be-ims.onrender.com' }), // base URL
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/api/IMS/product',  // Endpoint for fetching the list of products
    }),
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/api/IMS/product',  // Endpoint for creating a new product
        method: 'POST',
        body: newProduct,
      }),
    }),
  }),
});


export const { useGetProductsQuery, useCreateProductMutation } = productApi;
