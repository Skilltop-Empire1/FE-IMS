import React, { useEffect, useState } from 'react'
import { useGetStoresQuery } from '../../redux/APIs/storeApi'
import { useGetCategoriesQuery } from '../../redux/categoryApi'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetProductByIdQuery,
  useTransferProductMutation,
} from '../../redux/APIs/productApi'

// Initial form state
const initialState = {
  storeId: null,
  categoryId: null,
  destinationStore: null,
  destinationCategory: null,
  quantity: '',
  reasonForTransfer: '',
}

const TransferProduct = () => {
  const { productId } = useParams()
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()


  // Fetch data from APIs
  const {
    data: stores,
    isLoading: storesLoading,
    error: storesError,
  } = useGetStoresQuery()

  const {
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGetCategoriesQuery()

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetProductByIdQuery(productId)

  console.log(categories)

  const [transferProduct, { isLoading: isTransferring }] =
    useTransferProductMutation()

  // Update form field value
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate required fields
    setErrors((prev) => ({
      ...prev,
      apiError: null,
    }))
    const newErrors = {}
    if (!formData.storeId) newErrors.storeId = 'Destination Store is required'
    if (!formData.categoryId) newErrors.categoryId = 'Category is required'
    if (!formData.quantity || formData.quantity <= 0)
      newErrors.quantity = 'Quantity must be greater than zero'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }


    try {
      await transferProduct({
        name: product?.name,
        quantity: Number(formData?.quantity),
        currentStore: product?.storeName,
        reasonForTransfer : formData?.reasonForTransfer,
        currentCategory: product?.categoryName,
        destinationStore: formData?.storeId,
        destinationCategory: formData?.categoryId,
      }).unwrap()
      alert('Product transferred successfully!');
      navigate('/app/products/transfer/history')
    } catch (error) {
      setErrors({ apiError: error?.data?.message })
      console.error('Error transferring product:', error)
    }
  }

  if (productLoading) return <p>Loading product details...</p>
  if (productError) return <p>Error: {JSON.stringify(productError)}</p>

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-2xl font-bold mb-6">Transfer Product</h1>
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={handleSubmit}
      >
        {errors?.apiError && (
          <div className="text-red-400 md:col-span-2">{errors?.apiError}</div>
        )}
        {/* Left Side */}
        <div className="flex flex-col gap-4">
          {/* Product Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="text-gray-900">{product?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Store
            </label>
            <p className="text-gray-900">{product?.storeName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Category
            </label>
            <p className="text-gray-900">{product?.categoryName}</p>
          </div>

          {/* Destination Store */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Destination Store
            </label>
            <select
              value={formData.storeId || ''}
              onChange={(e) => handleChange('storeId', e.target.value)}
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Store</option>
              {storesLoading ? (
                <option>Loading Stores...</option>
              ) : storesError ? (
                <option>Error Loading Stores</option>
              ) : (
                stores.map((store) => (
                  <option key={store.storeId} value={store.storeName}>
                    {store.storeName}
                  </option>
                ))
              )}
            </select>
            {errors.storeId && (
              <p className="text-xs text-red-500">{errors.storeId}</p>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4">
          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity to Transfer
            </label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              placeholder="Enter Quantity"
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.quantity && (
              <p className="text-xs text-red-500">{errors.quantity}</p>
            )}
          </div>

          {/* Reason for Transfer */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason for Transfer
            </label>
            <textarea
              value={formData.reasonForTransfer}
              onChange={(e) =>
                handleChange('reasonForTransfer', e.target.value)
              }
              placeholder="Describe Reason for Transfer"
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              rows="3"
            />
          </div>

          {/* Destination Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Destination Category
            </label>
            <select
              value={formData.categoryId || ''}
              onChange={(e) => handleChange('categoryId', e.target.value)}
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="">Select Category</option>
              {categoriesLoading ? (
                <option>Loading Categories...</option>
              ) : categoriesError ? (
                <option>Error Loading Categories</option>
              ) : (
                categories.categories.map((category) => (
                  <option key={category.catId} value={category.name}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            {errors.categoryId && (
              <p className="text-xs text-red-500">{errors.categoryId}</p>
            )}
          </div>
        </div>
      </form>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => {
            setFormData(initialState)
            setErrors({})
          }}
          className="border border-purple-500 text-purple-500 w-[150px] py-2 rounded-lg hover:bg-purple-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-purple-500 text-white w-[150px] py-2 rounded-lg hover:bg-purple-600 transition disabled:cursor-not-allowed"
          disabled={isTransferring}
        >
          {isTransferring ? 'Transferring...' : 'Transfer'}
        </button>
      </div>
    </div>
  )
}

export default TransferProduct
