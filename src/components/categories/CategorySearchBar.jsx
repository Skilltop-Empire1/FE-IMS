import React from 'react'
import { useGetStoresQuery } from '../../redux/APIs/storeApi'

const CategorySearchBar = () => {
  // Fetch stores
  const {
    data: stores,
    error: storesError,
    isLoading: storesLoading,
  } = useGetStoresQuery()

  return (
    <div className="p-4  shadow-md rounded-md bg-gray-200">
      <div className="flex flex-wrap gap-2">
        {/* Input field */}
        <input
          type="text"
          placeholder="Enter category name"
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-imsDarkPurple"
        />

        {/* Select dropdown */}
        <select className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-imsDarkPurple">
          <option disabled>Select Store</option>
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
        {/* Save Button */}
        <button className="p-2 text-white bg-imsDarkPurple rounded-md hover:bg-purple-600">
          Save Category
        </button>

        {/* Delete Button */}
        <button className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600">
          Delete Category
        </button>
      </div>
    </div>
  )
}

export default CategorySearchBar
