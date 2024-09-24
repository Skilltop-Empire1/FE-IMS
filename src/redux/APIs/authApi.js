import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout as logoutAction, setCredentials } from '../slices/AuthSlice';

export const authApi = createApi({
  reducerPath: 'passwordReset',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://be-ims.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: '/api/IMS/user/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/IMS/user/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response) => {

        if (response && response.token) {
          return response.token;
        }
        throw new Error('Token missing in response');
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: token } = await queryFulfilled;

          dispatch(setCredentials({ token }));
        } catch (err) {
          console.error('Login failed:', err);
        }
      },
    }),

    fetchUser: builder.query({
      query: () => 'user',
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/api/IMS/user/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logoutAction());
        } catch (err) {
          console.error('Logout failed:', err);
        }
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useFetchUserQuery, useLogoutMutation } = authApi;
