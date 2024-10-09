import React, { useState, useEffect } from 'react'
import { useGetCategoriesQuery } from '../../redux/categoryApi'
import { useGetStoresQuery } from '../../redux/APIs/storeApi'

const EditProductModal = ({
  showUpdateModal,
  setShowUpdateModal,
  productToUpdate,
  confirmUpdateProduct,
}) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...productToUpdate })
  const [previewImage, setPreviewImage] = useState(null) // For previewing the new image

  // Fetch the categories
  const { data: categories = [], isLoading, isError } = useGetCategoriesQuery()
  const {
    data: stores = [],
    isLoading: isLoadingStores,
    isError: isErrorStores,
  } = useGetStoresQuery()

  // Update the state when productToUpdate changes
  useEffect(() => {
    if (productToUpdate) {
      setUpdatedProduct({ ...productToUpdate })
      setPreviewImage(productToUpdate?.prodPhoto || null) // Ensure safe access
    }
  }, [productToUpdate])

  const handleInputChange = (e) => {
    const { name, value, files } = e.target

    // Handle file input for product photo
    if (name === 'prodPhoto' && files && files.length > 0) {
      const file = files[0]

      // Ensure file is valid before using FileReader
      if (file) {
        const reader = new FileReader()

        reader.onloadend = () => {
          setPreviewImage(reader.result) // Preview the uploaded image
        }

        reader.readAsDataURL(file) // Read the file as a data URL to display the image

        // Update state with file (for form submission)
        setUpdatedProduct((prev) => ({
          ...prev,
          [name]: file, // Store file for further use (e.g., uploading)
        }))
      }
    } else {
      // For other inputs
      setUpdatedProduct((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleCategoryChange = (e) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      categoryId: e.target.value, // Store the category ID
    }))
  }

  const handleStoreChange = (e) => {
    const selectedStoreId = e.target.value
    const selectedStore = stores.find(
      (store) => store.storeId === selectedStoreId,
    )

    // Update state with store ID and name
    setUpdatedProduct((prev) => ({
      ...prev,
      storeId: selectedStoreId, // Store ID
      storeAvailable: selectedStore ? selectedStore.storeName : '', // Set to store name
    }))
  }

  return (
    <div>
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-2xl max-h-[600px] rounded-lg shadow-lg p-6 space-y-4 overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Product
            </h2>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                confirmUpdateProduct(updatedProduct) // Pass the updatedProduct
              }}
              className="space-y-4"
            >
              {/* Product Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  name="name"
                  value={updatedProduct?.name || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Product Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Price
                </label>
                <input
                  name="price"
                  value={updatedProduct?.price || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Price"
                />
              </div>

              {/* Product Photo Input and Existing Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Photo
                </label>
                <div className="flex items-center space-x-4">
                  {/* File Input */}
                  <input
                    type="file"
                    name="prodPhoto"
                    onChange={handleInputChange}
                    className="mt-1 block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  {/* Existing/Preview Image */}
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Product preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </div>
                {productToUpdate?.prodPhoto && !previewImage && (
                  <p className="text-xs text-gray-500 mt-1">
                    Current Image: {productToUpdate.prodPhoto}
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedProduct?.quantity || 0}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Quantity"
                />
              </div>

              {/* Category Select Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                {isLoading ? (
                  <p className="text-gray-500">Loading categories...</p>
                ) : isError ? (
                  <p className="text-red-500">
                    Error fetching categories. Please try again.
                  </p>
                ) : (
                  <select
                    name="categoryId" // Ensure this matches your API
                    value={updatedProduct?.categoryId || ''}
                    onChange={handleCategoryChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Category</option>
                    {categories.categories.map((category) => (
                      <option key={category.catId} value={category.catId}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Store Name
                </label>
                {isLoadingStores ? (
                  <p className="text-gray-500">Loading stores...</p>
                ) : isErrorStores ? (
                  <p className="text-red-500">
                    Error fetching stores. Please try again.
                  </p>
                ) : (
                  <select
                    name="storeAvailable" // Ensure this matches your API
                    value={updatedProduct?.storeId || ''}
                    onChange={handleStoreChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="">Select Store</option>
                    {stores.map((store) => (
                      <option key={store.storeId} value={store.storeId}>
                        {store.storeName}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Alert Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Alert Limit
                </label>
                <input
                  type="number"
                  name="alertStatus"
                  value={updatedProduct?.alertStatus || 0}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Alert Status"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2  text-white rounded-md bg-purple-800 hover:bg-purple-950"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditProductModal
