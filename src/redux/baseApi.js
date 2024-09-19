// src/api/baseApi.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApiUrl = 'https://be-ims.onrender.com' // Centralized Base URL

export const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  // You can add global headers, authorization, etc., here if needed
  prepareHeaders: (headers) => {
    // Optionally, add any headers like authorization tokens here
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

export default baseQuery
