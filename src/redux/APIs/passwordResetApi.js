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
      query: ({ token, newPassword }) => ({
        url: '/api/IMS/user/submit-reset',
        method: 'POST',
        body: { token, newPassword },
      }),
    }),
  }),
});

export const { useRequestPasswordResetMutation, useResetPasswordMutation } = passwordReset;
