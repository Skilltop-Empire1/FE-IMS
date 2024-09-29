import React, { useState } from 'react'
import { useGetStoresQuery } from '../../redux/APIs/storeApi'
import { z } from 'zod'
import { useCreateCategoryMutation } from '../../redux/categoryApi'
import { useCategory } from '../../context/CategoryContext'

// Initial form state
const initialState = {
  name: '',
  storeId: null,
}

// Schema for form validation
export const categorySchema = z.object({
  name: z.string().min(1, 'Category Name is required'),
  storeId: z
    .union([z.number(), z.string()]) // Accepts number or string
    .refine(
      (val) => {
        const parsed = parseInt(val) // Try to parse the value as a number
        return !isNaN(parsed) // Ensure it's a valid number
      },
      {
        message: 'Select a Store', // Error message when it's not a number
      },
    ),
})

const CategorySearchBar = () => {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { selectedCategory, deleteCategory } = useCategory() // Use the context

  // Create category mutation
  const [createCategory] = useCreateCategoryMutation()
  // Fetch stores
  const {
    data: stores,
    error: storesError,
    isLoading: storesLoading,
  } = useGetStoresQuery()

  // Handle input changes
  const handleChange = (field, value) => {
    setErrors({})
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
    setApiError(null)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    // Validate form data
    try {
      categorySchema.parse(formData)

      // Call API to create category
      const newCategory = {
        ...formData,
      }
      await createCategory(newCategory).unwrap()

      // Update the category cache or refetch the list
      setFormData(initialState) // Reset form on success
      setLoading(false)
      alert('Category Successfully Added')
    } catch (error) {
      console.log({ error })
      // Handle validation errors
      if (error.errors) {
        const fieldErrors = {}
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      } else {
        setApiError(['Error creating category.'])
      }
      setLoading(false)
    }
  }

  return (
    <div className="p-4  shadow-md rounded-md bg-gray-200">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap gap-2">
          {/* Input field */}
          <div className="flex-grow">
            <input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Category Name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-imsDarkPurple"
            />
            {errors?.name && (
              <p className="pt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>
          {/* Select dropdown */}
          <div className="flex-grow">
            <select
              value={Number(formData.storeId)}
              onChange={(e) => handleChange('storeId', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-imsDarkPurple"
            >
              <option value={null}>Select Store</option>
              {storesLoading || storesError ? (
                <option>Loading Stores...</option>
              ) : (
                stores &&
                stores.map((store) => (
                  <option key={store.storeId} value={Number(store.storeId)}>
                    {store.storeName}
                  </option>
                ))
              )}
            </select>
            {errors?.storeId && (
              <p className="pt-1 text-xs text-red-500">{errors.storeId}</p>
            )}
          </div>
          {/* Save Button */}
          <button
            className="p-2 text-white bg-imsDarkPurple rounded-md hover:bg-purple-600 disabled:bg-imsLightPurple"
            disabled={loading}
          >
            {loading ? 'Please wait...' : 'Save Category'}
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={deleteCategory}
            disabled={!selectedCategory} //
            className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            Delete Category
          </button>
        </div>
      </form>
    </div>
  )
}

export default CategorySearchBar
