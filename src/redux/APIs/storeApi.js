import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const storesApi = createApi({
  reducerPath: 'storesApi',  // Unique key to identify the API slice
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://be-ims.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem('token');

      // console.log('Token in state:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Attach the token to the header
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // GET request to fetch all stores
    getStores: builder.query({
      query: () => '/api/IMS/store/all', // Stores endpoint
      refetchOnMountOrArgChange: true,
    }),

    // POST request to create a new store
    createStore: builder.mutation({
      query: (newStore) => ({
        url: '/api/IMS/store/create', // Store creation endpoint
        method: 'POST',
        body: newStore,
      }),
    }),

    getStoresOverview: builder.query({
      query: () => '/api/IMS/store/overview', // Overview endpoint
      refetchOnMountOrArgChange: true,
    }),

    // GET request to fetch location list
    getLocations: builder.query({
      query: () => '/api/IMS/store/filter', // endpoint to get locations
      refetchOnMountOrArgChange: true,
    }),

    //delete a store

    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/api/IMS/store/delete/${id}`,
        method: 'DELETE',
      }),
    }),

    //update a store

    updateStore: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/IMS/store/edit/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),
  }),
})

export const {
  useGetStoresQuery,
  useCreateStoreMutation,
  useGetLocationsQuery,
  useGetStoresOverviewQuery,
  useDeleteStoreMutation,
  useUpdateStoreMutation
} = storesApi;
