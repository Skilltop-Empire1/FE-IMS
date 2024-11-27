import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const accountApi = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://be-ims-production.up.railway.app/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("token is",token);
      
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOpex: builder.query({
      query: () => ({
        url: '/api/IMS/expenditure/list?opex=true',
      }),
    }),
    updateOpex: builder.mutation({
      query: (data) => ({
        url: '/api/IMS/',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['account'],
    }),
    deleteOpex: builder.mutation({
      query: () => ({
        url: '/api/IMS/',
        method: 'DELETE',
      }),
      invalidatesTags: ['account'],
    }),
    addOpex: builder.mutation({
      query: ({type, data}) => ({
        url: '/api/IMS/expenditure/create',
        method: 'POST',
        body: data,
        type
      }),
    }),
    getCapex: builder.query({
      query: () => ({
        url: '/api/IMS/expenditure/list?capex=true',
      }),
    }),
    updateCapex: builder.mutation({
      query: (account) => ({
        url: '/api/IMS/',
        method: 'PUT',
        body: JSON.stringify(account),
      }),
      invalidatesTags: ['account'],
    }),
    deleteCapex: builder.mutation({
      query: () => ({
        url: '/api/IMS/',
        method: 'DELETE',
      }),
      invalidatesTags: ['account'],
    }),
    addCapex: builder.mutation({
      query: ({data, type}) => ({
        url: '/api/IMS/expenditure/create',
        method: 'POST',
        body: data,
        type
      }),
    }),
  }),
});

export const {
  useGetOpexQuery,
  useUpdateOpexMutation,
  useDeleteOpexMutation,
  useAddOpexMutation,
  useGetCapexQuery,
  useUpdateCapexMutation,
  useDeleteCapexMutation,
  useAddCapexMutation,
} = accountApi;

export default accountApi;
