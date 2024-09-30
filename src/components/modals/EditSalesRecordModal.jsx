import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../../redux/APIs/productApi';
import { useGetStoresQuery } from '../../redux/APIs/storeApi';
import { useGetCategoriesQuery } from '../../redux/categoryApi';

const EditSalesRecordModal = ({ showModal, setShowModal, record, handleUpdate }) => {
  const [formData, setFormData] = useState({});
  
  const { data: products = [], isLoading: productsLoading, isError: productsError } = useGetProductsQuery();
  const { data: stores = [], isLoading: storesLoading, isError: storesError } = useGetStoresQuery();
  const { data: categories = [], isLoading: categoriesLoading, isError: categoriesError } = useGetCategoriesQuery(); // Fetch categories

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (record) {
      setFormData({
        ...record,
        productId: record?.productId, // Set Product ID
        storeId: record?.storeId, // Set Store ID
        categoryId: record?.categoryId, // Set Category ID
        paymentMethod: record?.paymentMethod, // Set Payment Method
      });
    }
  }, [record]);

  // Function to handle product selection
  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = products.find(product => product.prodId === selectedProductId);

    setFormData((prev) => ({
      ...prev,
      productId: selectedProductId,
      productName: selectedProduct ? selectedProduct.name : '',
    }));
  };

  // Function to handle store selection
  const handleStoreChange = (e) => {
    const selectedStoreId = e.target.value;
    const selectedStore = stores.find(store => store.storeId === selectedStoreId);

    setFormData((prev) => ({
      ...prev,
      storeId: selectedStoreId,
      storeName: selectedStore ? selectedStore.storeName : '',
    }));
  };

  // Function to handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.categories.find(category => category.id === selectedCategoryId);

    setFormData((prev) => ({
      ...prev,
      categoryId: selectedCategoryId,
      categoryName: selectedCategory ? selectedCategory.name : '',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData); // Submit the updated form data
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Sales Record</h2>
        <form onSubmit={handleSubmit}>
          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData?.paymentMethod || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            >
              <option value="">Select a payment method</option>
              <option value="POS">POS</option>
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity || ''}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Product Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            {productsLoading ? (
              <p className="text-gray-500">Loading products...</p>
            ) : productsError ? (
              <p className="text-red-500">Error fetching products.</p>
            ) : (
              <select
                name="productId"
                value={formData?.productId || ''}
                onChange={handleProductChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.prodId} value={product.prodId}>
                    {product.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            {categoriesLoading ? (
              <p className="text-gray-500">Loading categories...</p>
            ) : categoriesError ? (
              <p className="text-red-500">Error fetching categories.</p>
            ) : (
              <select
                name="categoryId"
                value={formData?.categoryId || ''}
                onChange={handleCategoryChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select category</option>
                {categories.categories.map((category) => (
                  <option key={category.catId} value={category.catId}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Store */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Store</label>
            {storesLoading ? (
              <p className="text-gray-500">Loading stores...</p>
            ) : storesError ? (
              <p className="text-red-500">Error fetching stores.</p>
            ) : (
              <select
                name="storeId"
                value={formData?.storeId || ''}
                onChange={handleStoreChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Select store</option>
                {stores.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2  text-white rounded-md bg-purple-800 hover:bg-purple-950"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSalesRecordModal;
