import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const storesApi = createApi({
  reducerPath: 'storesApi',  // Unique key to identify the API slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://be-ims.onrender.com' }),  // base URL 
  endpoints: (builder) => ({
    // GET request to fetch all stores
    getStores: builder.query({
      query: () => '/api/IMS/store/all',  //  endpoint 
    }),
    
    // POST request to create a new store
    createStore: builder.mutation({
      query: (newStore) => ({
        url: '/api/IMS/store/create',  //  endpoint 
        method: 'POST',
        body: newStore,
      }),
    }),
  }),
});


export const { useGetStoresQuery, useCreateStoreMutation } = storesApi;
