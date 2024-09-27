// src/api/staffApi.js
import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from './baseApi' // Import the shared baseQuery

export const staffApi = createApi({
  reducerPath: 'staffApi',
  baseQuery, // Use the shared baseQuery
  tagTypes: ['Staff'], // Ensure cache invalidation across operations
  endpoints: (builder) => ({
    // Get paginated staff members
    getStaff: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/api/IMS/staff', // Endpoint for fetching the list of staff members
        params: { page, limit }, // Send pagination parameters
      }),
      providesTags: ['Staff'], // Tag for cache invalidation
    }),

    // Get a single staff member by ID
    getStaffById: builder.query({
      query: (id) => `/api/IMS/staff/${id}`, // Fetch staff member by ID
      providesTags: (result, error, id) => [{ type: 'Staff', id }], // Cache tag for a single staff member
    }),

    // Create a new staff member
    createStaff: builder.mutation({
      query: (newStaff) => ({
        url: '/api/IMS/staff/invite',
        method: 'POST',
        body: JSON.stringify(newStaff), // Send the newStaff object as JSON
        headers: {
          'Content-Type': 'application/json', // Ensure proper content-type for JSON
        },
      }),
      invalidatesTags: ['Staff'], // Invalidate cache when a new staff member is created
    }),

    // Update an existing staff member by ID
    updateStaff: builder.mutation({
      query: ({ id, updatedStaff }) => ({
        url: `/api/IMS/staff/${id}`, // Update staff member by ID
        method: 'PUT',
        body: JSON.stringify(updatedStaff),
        headers: {
          'Content-Type': 'application/json', // Ensure proper content-type for JSON
        },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Staff', id }], // Invalidate cache for the updated staff member
    }),

    // Delete a staff member by ID
    deleteStaff: builder.mutation({
      query: (id) => ({
        url: `/api/IMS/staff/delete/${id}`, // Endpoint for deleting a staff member
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Staff', id }], // Invalidate cache for the deleted staff member
    }),
  }),
})

// Export hooks for all CRUD operations
export const {
  useGetStaffQuery,
  useGetStaffByIdQuery,
  useCreateStaffMutation,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi
