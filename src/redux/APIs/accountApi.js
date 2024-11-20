import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const accountApi = createApi({
  reducerPath: "account",
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://be-ims.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem('token');
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
      query: (account) => ({
        url: '/api/IMS/',
        method: 'PUT',
        body: JSON.stringify(account),
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
      query: (account) => ({
        url: '/api/IMS/',
        method: 'POST',
        body: JSON.stringify(account),
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
      query: (account) => ({
        url: '/api/IMS/',
        method: 'POST',
        body: JSON.stringify(account),
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



