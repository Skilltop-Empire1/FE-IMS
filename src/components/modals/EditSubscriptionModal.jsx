import React, { useEffect, useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { z } from 'zod'
import { useUpdateSubscriptionDataMutation } from '../../redux/requestDemoApi'

// Initial form state
const initialState = {
  businessName: '',
  email: '',
  subs: '',
  payDate: '',
  phone: '',
  sendEmail: false,
  amount: '',
  paymentProvider: '',
  transactionId: '',
  paymentStatus: '',
}

// Schema for form validation
export const subscriptionSchema = z.object({
  businessName: z.string().min(1, 'Business Name is required'),
  email: z.string().email('Invalid email address'),
  subs: z.string().min(1, 'Subscription duration is required'),
  payDate: z.string().min(1, 'Payment date is required'),
  phone: z.string().regex(/^(?:0|\+)[0-9]{10,15}$/, 'Invalid phone number'),
  sendEmail: z.boolean(),
  amount: z.number().positive('Amount must be greater than 0'),
  paymentProvider: z.string().min(1, 'Payment provider is required'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
  paymentStatus: z.enum(['completed', 'pending', 'failed']),
})

const EditSubscriptionModal = ({
  visible,
  onClose,
  subscriptionInfo,
  refetch,
}) => {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const [updateSubscription, { isLoading }] =
    useUpdateSubscriptionDataMutation()

  // Handle input changes
  const handleChange = (field, value) => {
    setErrors({})
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})

    try {
      subscriptionSchema.parse(formData)
      const response = await updateSubscription({
        ...formData,
        name: formData.businessName,
        payId: subscriptionInfo.payId,
      })
      console.log({ response })
      // Mock API call
      console.log('Updating subscription:', formData)
      refetch()

      // Reset form and close modal
      setFormData(initialState)
    } catch (error) {
      console.log({ error })
      if (error.errors) {
        const fieldErrors = {}
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message
        })
        setErrors(fieldErrors)
      }
    } finally {
      onClose()
    }
  }

  useEffect(() => {
    setErrors({})
    if (subscriptionInfo) {
      setFormData(subscriptionInfo)
    }
  }, [visible, subscriptionInfo])

  if (!visible) return null

  return (
    <ModalWrapper onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="relative flex-grow rounded-2xl bg-white shadow"
      >
        <div className="flex flex-col items-center justify-center rounded-t p-4">
          <h3 className="mt-8 text-center text-lg font-medium text-gray-900">
            Edit Subscription Data
          </h3>
        </div>
        <div className="space-y-4 p-6">
          <div>
            <label className="text-sm text-imsPurple mb-1">Business Name</label>
            <input
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="Enter business name"
              type="text"
              className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
            />
            {errors.businessName && (
              <p className="pt-1 text-xs text-red-500">{errors.businessName}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-imsPurple mb-1">Email</label>
            <input
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email"
              type="email"
              className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
            />
            {errors.email && (
              <p className="pt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-imsPurple mb-1">
              Subscription Duration - {formData.subType}
            </label>
            <input
              value={formData.subs}
              onChange={(e) => handleChange('subs', e.target.value)}
              placeholder="Enter subscription duration"
              type="text"
              className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
            />
            {errors.subs && (
              <p className="pt-1 text-xs text-red-500">{errors.subs}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-imsPurple mb-1">Payment Date</label>
            <input
              value={formData.payDate}
              onChange={(e) => handleChange('payDate', e.target.value)}
              placeholder="Enter payment date"
              type="date"
              className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
            />
            {errors.payDate && (
              <p className="pt-1 text-xs text-red-500">{errors.payDate}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-imsPurple mb-1">Phone</label>
            <input
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="Enter phone number"
              type="text"
              className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
            />
            {errors.phone && (
              <p className="pt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="text-sm text-imsPurple mb-1">Amount</label>
            <input
              value={formData.amount}
              onChange={(e) =>
                handleChange('amount', parseFloat(e.target.value) || '')
              }
              placeholder="Enter amount"
              type="number"
              className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
            />
            {errors.amount && (
              <p className="pt-1 text-xs text-red-500">{errors.amount}</p>
            )}
          </div>
          <div>
            <label className="text-sm text-imsPurple mb-1">
              Payment Provider
            </label>
            <input
              value={formData.paymentProvider}
              onChange={(e) => handleChange('paymentProvider', e.target.value)}
              placeholder="Enter payment provider"
              type="text"
              className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
            />
            {errors.paymentProvider && (
              <p className="pt-1 text-xs text-red-500">
                {errors.paymentProvider}
              </p>
            )}
          </div>
          <div>
            <label className="text-sm text-imsPurple mb-1">
              Transaction ID
            </label>
            <div className="flex items-center space-x-2 border border-gray-300">
              <input
                value={formData.transactionId}
                onChange={(e) => handleChange('transactionId', e.target.value)}
                placeholder="Enter transaction ID"
                type="text"
                className="z-10 block w-full rounded p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  const characters =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
                  let id = ''
                  for (let i = 0; i < 12; i++) {
                    id += characters.charAt(
                      Math.floor(Math.random() * characters.length),
                    )
                  }
                  handleChange('transactionId', id.toUpperCase())
                }}
                className="px-3 py-2 bg-imsPurple text-white text-sm rounded hover:bg-imsLightPurple focus:outline-none"
              >
                Autogenerate
              </button>
            </div>
            {errors.transactionId && (
              <p className="pt-1 text-xs text-red-500">
                {errors.transactionId}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-imsPurple mb-1">
              Payment Status
            </label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => handleChange('paymentStatus', e.target.value)}
              className="z-10 block w-full rounded border border-gray-300 p-[14px] text-sm focus:border-imsLightPurple focus:outline-none"
            >
              <option value="">Select Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="expired">Expired</option>
            </select>
            {errors.paymentStatus && (
              <p className="pt-1 text-xs text-red-500">
                {errors.paymentStatus}
              </p>
            )}
          </div>
          <div className="flex gap-1 items-center">
            <label className="text-sm text-imsPurple flex gap-1 items-center">
              <input
                type="checkbox"
                checked={formData.sendEmail}
                onChange={(e) => handleChange('sendEmail', e.target.checked)}
              />
              Send Email
            </label>
          </div>
        </div>
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
            {loading ? 'Please wait...' : 'Save'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  )
}

export default EditSubscriptionModal
