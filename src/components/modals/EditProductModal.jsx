import React, { useState, useEffect } from 'react';

const EditProductModal = ({ showUpdateModal, setShowUpdateModal, productToUpdate, confirmUpdateProduct }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...productToUpdate });

  // Update the state when productToUpdate changes
  useEffect(() => {
    setUpdatedProduct({ ...productToUpdate });
  }, [productToUpdate]);

  const handleInputChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {showUpdateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Edit Product</h2>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmUpdateProduct(updatedProduct);
              }}
              className="space-y-4"
            >
              {/* Product Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  name="name"
                  value={updatedProduct?.name || ''} // Use value instead of defaultValue for controlled input
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Product Name"
                />
              </div>

              {/* Product Photo URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Photo URL</label>
                <input
                  name="prodPhoto"
                  value={updatedProduct?.prodPhoto || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Product Photo URL"
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedProduct?.quantity || 0}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Quantity"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  name="category"
                  value={updatedProduct?.category || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Category"
                />
              </div>

              {/* Store Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Store Name</label>
                <input
                  name="storeAvailable"
                  value={updatedProduct?.storeAvailable || ''}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter Store Name"
                />
              </div>

              {/* Alert Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Alert Limit</label>
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductModal;
