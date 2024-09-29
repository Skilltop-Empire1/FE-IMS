// src/api/categoryApi.js
import { createApi } from '@reduxjs/toolkit/query/react'
import baseQuery from './baseApi' // Import the shared baseQuery

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery, // Use the shared baseQuery
  tagTypes: ['Category'], // Ensure cache invalidation across operations
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query({
      query: () => '/api/IMS/category', // Endpoint for fetching the list of categories
      providesTags: ['Category'], // Tag for cache invalidation
    }),

    // Get a single category by ID
    getCategoryById: builder.query({
      query: (id) => `/api/IMS/category/${id}`, // Fetch category by ID
      providesTags: (result, error, id) => [{ type: 'Category', id }], // Cache tag for a single category
    }),

    // Create a new category (supports image upload)
    createCategory: builder.mutation({
      query: (newCategory) => {
        const formData = new FormData()
        formData.append('name', newCategory.name)
        formData.append('description', newCategory.description)
        if (newCategory.image) {
          formData.append('image', newCategory.image) // Handle image file upload
        }

        return {
          url: '/api/IMS/category',
          method: 'POST',
          // body: formData,
          body: JSON.stringify(newCategory), // Send the newCategory object as JSON
          headers: {
            'Content-Type': 'application/json', // Ensure proper content-type for JSON
          },
        }
      },
      invalidatesTags: ['Category'], // Invalidate cache when a new category is created
    }),

    // Update an existing category by ID (supports image upload)
    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => {
        const formData = new FormData()
        formData.append('name', updatedCategory.name)
        formData.append('description', updatedCategory.description)
        if (updatedCategory.image) {
          formData.append('image', updatedCategory.image) // Handle image file upload
        }

        return {
          url: `/api/IMS/category/${id}`, // Update category by ID
          method: 'PUT',
          body: formData,
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Category', id }], // Invalidate cache for the updated category
    }),

    // Delete a category by ID
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/IMS/category/${id}`, // Endpoint for deleting a category
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Category', id }], // Invalidate cache for the deleted category
    }),
  }),
})

// Export hooks for all CRUD operations
export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi
