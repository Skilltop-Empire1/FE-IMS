import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout as logoutAction } from './slices/AuthSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://be-ims.onrender.com', // Ensure this base URL is correct
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token; // Adjust if token is stored differently
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: 'signup', // Ensure this path is correct
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/IMS/user/login', // Ensure this path is correct
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => response.token, // Adjust if response shape is different
    }),
    fetchUser: builder.query({
      query: () => 'user', // Ensure this path is correct
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutAction()); // Ensure this action creator is correct
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useFetchUserQuery, useLogoutMutation } = authApi;
