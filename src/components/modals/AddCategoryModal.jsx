import React, { useEffect, useState } from 'react'

import { useSearchParams } from 'react-router-dom'
import ModalWrapper from './ModalWrapper'
import { z } from 'zod'

const initialState = {
  name: '',
  description: '',
  image_url:
    'https://via.placeholder.com/640x480.png/006677?text=categories+Faker+unde',
}

export const categorySchema = z.object({
  name: z.string().min(1, 'Category Name is required'),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long.' })
    .max(500, { message: 'Description must not exceed 500 characters.' }),
})

const AddCategoryModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [imageFile, setImageFile] = useState(null)
  const [parentError, setParentError] = useState(null)
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [searchParams] = useSearchParams()
  const page = parseInt(searchParams.get('categorypage')) || 1
  const searchQuery = searchParams.get('categorysearch') || ''

  const handleImageChange = (file) => {
    setErrors({})
    setImageFile(file)
  }

  const handleChange = (field, value) => {
    setErrors({})
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
    setApiError(null)
  }
  useEffect(() => {
    setErrors({})
  }, [show])
  const handleSubmit = async (e) => {
    e.preventDefault()
    setApiError(null)
    const result = categorySchema.safeParse(formData)

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors)
      console.log({ errors })
      return
    }
    setErrors({})

    // TODO:: validate image upload field here before mamking api request
    try {
      const submitFormData = new FormData()
      for (const key in formData) {
        if (formData.hasOwnProperty(key)) {
          submitFormData.append(key, formData[key])
        }
      }
      if (imageFile) {
        submitFormData.append('image_url', imageFile)
      } else {
        setErrors((prev) => ({
          ...prev,
          image_url: 'Category Image is required',
        }))
        return
      }
      setLoading(true)
      await createCategory(submitFormData)
      mutate([page, searchQuery, 12, 'categories'])
      setLoading(false)
      setFormData(initialState)
      onClose()
      showSuccessToast(
        'Completed!',
        'New Product Category has been created successfully',
      )
    } catch (error) {
      console.log({ error })
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorResponse = error.response.data
        if (errorResponse.errors) {
          // Extract the specific error messages
          const errorMessages = Object.values(errorResponse.errors).flat()
          setApiError(errorMessages)
        } else {
          setApiError([
            `Error: ${errorResponse.message} (status: ${error.response.status})`,
          ])
        }
      } else if (error.request) {
        // The request was made but no response was received
        setApiError(['Error: No response received from the server.'])
      } else {
        // Something happened in setting up the request that triggered an Error
        setApiError([`Error: ${error.message}`])
      }
      setLoading(false)
      return
    }
  }
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
                onChange={(value) => handleChange('name', value)}
                placeholder="Category Name"
                type="text"
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              />
              {errors?.name && (
                <p className="pt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <select
                value={formData.store}
                onChange={(value) => handleChange('store', value)}
                placeholder="Select Store"
                type="text"
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              >
                <option>Store 1</option>
                <option>Store 2</option>
                <option>Store 3</option>
                <option>Store 4</option>
                <option>Store 5</option>
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
            onClick={() => onClose()}
            className="flex-grow rounded-full bg-red-100 px-8 py-2.5 text-center text-xs font-medium hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-300"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="text-white text-center flex-grow bg-imsPurple rounded-full font-semibold px-8 py-2.5 text-xs  focus:ring-imsLightPurple focus:ring-offset-2 focus:ring-1"
          >
            {loading ? 'Please wait...' : 'Add Category'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default AddCategoryModal
