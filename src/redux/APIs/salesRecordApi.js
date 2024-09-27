import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const salesRecordApi = createApi({
  reducerPath: 'salesRecordApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://be-ims.onrender.com' }),
  endpoints: (builder) => ({
    getSalesRecord: builder.query({
      query: () => '/api/IMS/sales/get',
    }),
    createSalesRecord: builder.mutation({
      query: (newSalesRecord) => ({
        url: '/api/IMS/sales/create',
        method: 'POST',
        body: newSalesRecord,
      }),
    }),
    deleteSalesRecord: builder.mutation({
      query: (id) => ({
        url: `/api/IMS/sales/delete/${id}`,
        method: 'DELETE',
      }),
    }),
    updateSalesRecord: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/IMS/sales/update/${id}`,
        method: 'PUT',
        body: updatedData,
      }),
    }),
  }),
});

// Export hooks for the queries and mutations
export const { 
  useGetSalesRecordQuery, 
  useCreateSalesRecordMutation, 
  useDeleteSalesRecordMutation,
  useUpdateSalesRecordMutation 
} = salesRecordApi;
