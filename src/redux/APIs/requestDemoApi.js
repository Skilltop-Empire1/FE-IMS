import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const requestDemoApi = createApi({
  reducerPath: 'requestDemoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://be-ims-production.up.railway.app/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token

      // console.log('Token in state:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Attach the token to the header
      }
      return headers;
    },
  }), // Base URL
  endpoints: (builder) => ({
    // Fetch request demo list
    getRequestDemo: builder.query({
      query: () => '/api/IMS/demo/demo-list', // Endpoint for fetching the list of products
      refetchOnMountOrArgChange: true,
    }),


    // Create a new request demo
    createRequestDemo: builder.mutation({
      query: (userData) => ({
        url: '/api/IMS/demo/request-demo',
        method: 'POST',
        body: userData,
      }),
    }),
   
    // Create a new request demo
    createSubscriberDemo: builder.mutation({
      query: (userData) => ({
        url: '/api/IMS/plan/chose-plan',
        method: 'POST',
        body: userData,
      }),
    }),


  }),
})

export const {
    useGetRequestDemoQuery,
    useCreateRequestDemoMutation,
    useCreateSubscriberDemoMutation
} = requestDemoApi;

