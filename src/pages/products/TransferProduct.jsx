import React, { useEffect, useState } from 'react';
import { useGetStoresQuery } from '../../redux/APIs/storeApi';
import { useGetCategoriesQuery } from '../../redux/categoryApi';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../redux/APIs/productApi';


// Initial form state
const initialState = {
  name: '',
  storeId: null,
}
const TransferProduct = () => {

  const { productId } = useParams();
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [category, setCategory] = useState('')

  const {
    data: stores,
    error: storesError,
    isLoading: storesLoading,
  } = useGetStoresQuery()

  const { data: categories, isLoading: categorysLoading, error: categorysError } = useGetCategoriesQuery()
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  console.log({ product, error, isLoading, productId })

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;


  return (
    <div className="container mx-auto py-5">
      <h1 className="text-2xl font-bold mb-6">Transfer Product</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="flex flex-col gap-1">
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">Name</label>
            <p className="text-gray-900">{product?.name}</p>
          </div>
          {/* Current Store */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">Current Store</label>
            <p className="text-gray-900">{product?.name}</p>
          </div>
          {/* Current Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Category</label>
            <p className="text-gray-900">Cake</p>
          </div>
          {/* Destination Store */}

          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 my-2">Destination Store</label>
            <select
              value={formData.storeId}
              onChange={(e) => handleChange('storeId', e.target.value)}
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-imsLightPurple focus:border-imsLightPurple"
            >
              <option value={null}>Select Store</option>
              {storesLoading || storesError ? (
                <option>Loading Stores...</option>
              ) : stores.length > 0 ? (
                stores.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option>
                ))
              ) : (
                <option>No Stores Found</option>
              )}
            </select>
            {errors?.storeId && (
              <p className="pt-1 text-xs text-red-500">{errors.storeId}</p>
            )}
          </div>

        </div>

        {/* Right Side */}
        <div>
          {/* Quantity to Transfer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">Quantity to Transfer</label>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-imsLightPurple focus:border-imsLightPurple"
            />
          </div>
          {/* Reason for Transfer */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">
              Reason for Transfer <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              placeholder="Describe Reason for Transfer"
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-imsLightPurple focus:border-imsLightPurple"
              rows="3"
            />
          </div>
          {/* Destination Category */}
          {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">Destination Category</label>
            <select
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-imsLightPurple focus:border-imsLightPurple"
            >
              <option>Select Destination Category</option>
            
            </select>
          </div> */}
          <div>
            <label>Category:</label>
            <select
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-imsLightPurple focus:border-imsLightPurple"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categorysLoading ? (
                <option value="">Loading Categories</option>
              ) : categorysError ? (
                <option value="">Error Loading Categories</option>
              ) : (
                categories.categories.length > 0 ?
                  categories.categories.map((category) => (
                    <option key={category.catId} value={category.catId}>
                      {category.name}
                    </option>
                  )) :
                  <option value="">No category has been created</option>
              )}
            </select>
          </div>
        </div>
      </form>

      {/* Actions */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          type="button"
          className="border border-purple-500 text-purple-500 w-[150px] py-2 rounded-lg hover:bg-purple-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-purple-500 text-white w-[150px] py-2 rounded-lg hover:bg-purple-600 transition"
        >
          Transfer
        </button>
      </div>
    </div>
  );
};

export default TransferProduct;
