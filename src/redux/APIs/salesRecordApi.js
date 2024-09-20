import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const salesRecordApi = createApi({
  reducerPath: 'salesRecordApi',  // Unique key to identify the API slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://be-ims.onrender.com' }),  // Base URL for the API
  endpoints: (builder) => ({
    // GET request to fetch all sales records
    getSalesRecord: builder.query({
      query: () => '/api/IMS/sales/get',  // Sales records endpoint
    }),

    // POST request to create a new sales record
    createSalesRecord: builder.mutation({
      query: (newSalesRecord) => ({
        url: '/api/IMS/sales/create',  // Sales record creation endpoint
        method: 'POST',
        body: newSalesRecord,  // Pass the new sales record in the request body
      }),
    }),
  }),
});

// Export hooks for the queries and mutations
export const { useGetSalesRecordQuery, useCreateSalesRecordMutation } = salesRecordApi;
