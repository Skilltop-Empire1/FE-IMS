import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const storesApi = createApi({
  reducerPath: 'storesApi',  // Unique key to identify the API slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://be-ims.onrender.com' }),  // Base URL 
  endpoints: (builder) => ({
    // GET request to fetch all stores
    getStores: builder.query({
      query: () => '/api/IMS/store/all',  // Stores endpoint
    }),

    // POST request to create a new store
    createStore: builder.mutation({
      query: (newStore) => ({
        url: '/api/IMS/store/create',  // Store creation endpoint
        method: 'POST',
        body: newStore,
      }),
    }),

    getStoresOverview: builder.query({
      query: () => '/api/IMS/store/overview',  // Overview endpoint
    }),

    // GET request to fetch location list
    getLocations: builder.query({
      query: () => '/api/IMS/store/filter',  // endpoint to get locations
    }),
  }),
});

export const { useGetStoresQuery, useCreateStoreMutation, useGetLocationsQuery, useGetStoresOverviewQuery } = storesApi;
