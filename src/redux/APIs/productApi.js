import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://be-ims.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`); // Attach the token to the header
      // console.log('Token attached to headers:', headers.get('Authorization')); // Log token to verify
    }
    return headers;
  }, }), // Base URL
  endpoints: (builder) => ({
    // Fetch products
    getProducts: builder.query({
      query: () => '/api/IMS/product', // Endpoint for fetching the list of products
    }),
    getSoldProducts: builder.query({
      query: () => '/api/IMS/product/2',
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
        url: `/api/IMS/product/${prodId}`,
        method: 'PUT',
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
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
})

export const { 
  useGetProductsQuery,
  useCreateProductMutation, 
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetSoldProductsQuery
} = productApi;

