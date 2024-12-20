import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const profilePictureApi = createApi({
  reducerPath: 'profilePicture',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://be-ims.onrender.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    upload: builder.mutation({
      query: (profilePic) => {
        const formData = new FormData();
        formData.append('profilePic', profilePic);

        return {
          url: '/api/IMS/profile/upload',
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        };
      },
      transformResponse: (response) => response,
    }),
    getPicture: builder.query({
      query: () => ({
        url: '/api/IMS/profile/profilePic',
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const { useUploadMutation, useGetPictureQuery } = profilePictureApi;
export const { reducer } = profilePictureApi;
