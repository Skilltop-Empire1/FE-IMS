// src/api/baseApi.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// let backendUrl = 'https://be-ims-production.up.railway.app/'
let backendUrl = 'https://be-ims-production.up.railway.app/'
// let backendUrl = 'http://localhost:5000'

const baseApiUrl = backendUrl // Centralized Base URL
export const baseQuery = fetchBaseQuery({
  baseUrl: baseApiUrl,
  // You can add global headers, authorization, etc., here if needed
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

export default baseQuery
