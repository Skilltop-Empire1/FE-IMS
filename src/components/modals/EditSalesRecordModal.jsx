import React, { useState, useEffect } from 'react';

const EditSalesRecordModal = ({ showModal, setShowModal, record, handleUpdate }) => {
  const [formData, setFormData] = useState({});

  const closeModal = () => setShowModal(false);

  useEffect(() => {
    if (record) {
      setFormData({ ...record }); // Set initial form data
    }
  }, [record]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Sales Record</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Payment Method</label>
            <input
              type="text"
              name="paymentMethod"
              defaultValue={record?.paymentMethod}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              defaultValue={record?.quantity}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product name</label>
            <input
              type="text"
              name="quantity"
              defaultValue={record?.Product?.name}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input
              type="number"
              name="quantity"
              defaultValue={record?.quantity}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Store</label>
            <input
              type="text"
              name="quantity"
              defaultValue={record?.Store?.storeName}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              defaultValue={record?.quantity}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
              required
            />
          </div>    
          {/* Add more input fields as necessary */}
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

export default  EditSalesRecordModal;

