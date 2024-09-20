import React, { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { z } from 'zod'
import { useGetStoresQuery } from '../../redux/storeApi' // API hooks
import { useUpdateStaffMutation } from '../../redux/staffApi'

// Initial form state
const initialState = {
  username: '',
  email: '',
  storeId: '',
  permissions: '',
  role: '',
  status: '',
}

// Schema for form validation
export const staffSchema = z.object({
  username: z.string().min(1, 'Staff Username is required'),
  email: z.string().email('Invalid email address'),
  storeId: z.string().min(1, 'Store selection is required'),
  role: z.string().min(1, 'Role selection is required'),
  status: z.string().min(1, 'Status selection is required'),
})

const EditStaffModal = ({ visible, onClose, staffInfo, refetch }) => {
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

  // Update staff mutation
  const [updateStaff] = useUpdateStaffMutation()

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
      staffSchema.parse(formData)

      // Call API to update staff
      const updatedStaff = { ...formData }
      await updateStaff({ id: staffInfo.staffId, updatedStaff }).unwrap()
      refetch()
      // Reset form and close modal on success
      setFormData(initialState)
      setLoading(false)
      onClose()
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
        setApiError(['Error updating staff.'])
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    setErrors({})
    if (staffInfo) {
      setFormData((prev) => ({
        ...staffInfo,
      }))
    }
  }, [visible, staffInfo])

  if (!visible) return null

  return (
    <ModalWrapper onClose={onClose}>
      <form
        className="relative flex-grow rounded-2xl bg-white shadow"
        onSubmit={handleSubmit}
      >
        {/* Modal header */}
        <div className="flex flex-col items-center justify-center rounded-t p-4">
          <h3 className="mt-8 text-center text-lg font-medium text-gray-900">
            Edit Staff
          </h3>
        </div>
        {/* Modal body */}
        <div className="space-y-4 p-6">
          <div className="flex flex-col space-y-4">
            {apiError &&
              apiError.map((error, index) => (
                <p key={index} className="text-red-700">
                  {error}
                </p>
              ))}

            <div>
              <label className="text-sm text-imsPurple mb-1">
                Staff Username
              </label>
              <input
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Staff Name"
                type="text"
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              />
              {errors?.username && (
                <p className="pt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-imsPurple mb-1">Staff Email</label>
              <input
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Staff Email"
                type="email"
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              />
              {errors?.email && (
                <p className="pt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Store select dropdown */}
            <div>
              <label className="text-sm text-imsPurple mb-1">Store Name</label>
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
              {errors?.storeId && (
                <p className="pt-1 text-xs text-red-500">{errors.storeId}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-imsPurple mb-1">Staff Role</label>
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              >
                <option disabled value="">
                  Select Role
                </option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
                <option value="Super Admin">Super Admin</option>
                <option value="Sales Employee">Sales Employee</option>
                <option value="Admin">Admin</option>
                <option value="Finance">Finance</option>
              </select>
              {errors?.role && (
                <p className="pt-1 text-xs text-red-500">{errors.role}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-imsPurple mb-1">
                Staff Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              >
                <option disabled value="">
                  Select Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors?.status && (
                <p className="pt-1 text-xs text-red-500">{errors.status}</p>
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
            {loading ? 'Please wait...' : 'Edit Staff'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default EditStaffModal
