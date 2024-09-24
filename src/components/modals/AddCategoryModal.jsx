import React, { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { z } from 'zod'
import { useGetStoresQuery } from '../../redux/APIs/storeApi' // API hooks
import { useCreateCategoryMutation } from '../../redux/categoryApi'

// Initial form state
const initialState = {
  name: '',
  storeId: null,
}

// Schema for form validation
export const categorySchema = z.object({
  name: z.string().min(1, 'Category Name is required'),
  storeId: z.string().min(1, 'Store selection is required'),
})

const AddCategoryModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Fetch stores
  const {
    data: stores,
    error: storesError,
    isLoading: storesLoading,
  } = useGetStoresQuery()

  // Create category mutation
  const [createCategory] = useCreateCategoryMutation()

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
      onClose() // Close modal on success
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

  useEffect(() => {
    setErrors({})
    if (stores) {
      setFormData((prev) => ({
        ...prev,
        storeId: stores[0].storeId + '',
      }))
    }
  }, [show, stores])

  if (!show) return null

  return (
    <ModalWrapper onClose={onClose}>
      <form
        className="relative flex-grow rounded-2xl bg-white shadow"
        onSubmit={handleSubmit}
      >
        {/* Modal header */}
        <div className="flex flex-col items-center justify-center rounded-t p-4">
          <h3 className="mt-8 text-center text-lg font-medium text-gray-900">
            New Category
          </h3>
          <p>Customize your product category</p>
        </div>
        {/* Modal body */}
        <div className="space-y-4 p-6 pt-3">
          <div className="flex flex-col space-y-4">
            {apiError &&
              apiError.map((error, index) => (
                <p key={index} className="text-red-700">
                  {error}
                </p>
              ))}

            <div>
              <input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Category Name"
                type="text"
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              />
              {errors?.name && (
                <p className="pt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Store select dropdown */}
            <div>
              <select
                value={formData.storeId}
                onChange={(e) => handleChange('storeId', e.target.value)}
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              >
                <option disabled value="">
                  Select Store
                </option>
                {storesLoading || storesError ? (
                  <option>Loading Stores...</option>
                ) : (
                  stores &&
                  stores.map((store) => (
                    <option key={store.storeId} value={store.storeId}>
                      {store.storeName}
                    </option>
                  ))
                )}
              </select>
              {errors?.store && (
                <p className="pt-1 text-xs text-red-500">{errors.store}</p>
              )}
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="flex items-center space-x-3 rounded-b border-t border-gray-200 p-6 rtl:space-x-reverse">
          <button
            type="button"
            onClick={onClose}
            className="flex-grow rounded-full bg-red-100 px-8 py-2.5 text-center text-xs font-medium hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-300"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="text-white text-center flex-grow bg-imsPurple rounded-full font-semibold px-8 py-2.5 text-xs focus:ring-imsLightPurple focus:ring-offset-2 focus:ring-1"
          >
            {loading ? 'Please wait...' : 'Add Category'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default AddCategoryModal
