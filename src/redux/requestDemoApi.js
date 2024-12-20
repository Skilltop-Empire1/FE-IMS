import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const requestDemoApi = createApi({
  reducerPath: 'requestDemoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://be-ims.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token

      // console.log('Token in state:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`) // Attach the token to the header
      }
      return headers
    },
  }), // Base URL
  endpoints: (builder) => ({
    // Fetch request demo list
    getRequestDemo: builder.query({
      query: () => '/api/IMS/payment/code/list', // Endpoint for fetching the list of products
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
        url: '/api/IMS/payment/code/send',
        method: 'POST',
        body: userData,
      }),
    }),

    updateSubscriptionData: builder.mutation({
      query: ({ payId, updatedSubscription }) => {
        return {
          url: `/api/IMS/payment/code/${payId}`,
          method: 'PUT',
          body: updatedSubscription,
        }
      },
      invalidatesTags: (result, error, { payId }) => [
        { type: 'SubscriptionData', payId },
      ], // Invalidate cache for the updated category
    }),
  }),
})

export const {
  useGetRequestDemoQuery,
  useCreateRequestDemoMutation,
  useCreateSubscriberDemoMutation,
  useUpdateSubscriptionDataMutation,
} = requestDemoApi
