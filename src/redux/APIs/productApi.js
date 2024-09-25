import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://be-ims.onrender.com' }), // Base URL
  endpoints: (builder) => ({
    // Fetch products
    getProducts: builder.query({
      query: () => '/api/IMS/product',  // Endpoint for fetching the list of products
    }),
    
    // Create a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/api/IMS/product',
        method: 'POST',
        body: newProduct,
      }),
    }),

    // Edit (Update) a product
    updateProduct: builder.mutation({
      query: ({ prodId, updatedProduct }) => ({
        url: `/api/IMS/product/${prodId}`,  // Endpoint for updating a specific product
        method: 'PUT',
        body: updatedProduct,
      }),
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (prodId) => ({
        url: `/api/IMS/product/${prodId}`,  // Endpoint for deleting a specific product
        method: 'DELETE',
      }),
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useCreateProductMutation, 
  useUpdateProductMutation, 
  useDeleteProductMutation 
} = productApi;
