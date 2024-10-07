import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const passwordReset = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://be-ims.onrender.com' }),
  endpoints: (builder) => ({
    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: '/api/IMS/user/password-reset',
        method: 'POST',
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: '/api/IMS/user/submit-reset',
        method: 'PUT', // or 'POST' depending on your server
        body: payload,
      }),
    }),
     changePassword: builder.mutation({
      query: (payload) => ({
        url: '/api/IMS/user/change-password',
        method: 'PUT', // or 'POST' depending on your server
        body: payload,
      }),
    }),
  }),
});

export const { useRequestPasswordResetMutation, useResetPasswordMutation, useChangePasswordMutation } = passwordReset;
