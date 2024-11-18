import React from 'react';

const TransferProduct = () => {
  return (
    <div className="container mx-auto py-5">
      <h1 className="text-2xl font-bold mb-6">Transfer Product</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">Name</label>
            <p className="text-gray-900">Cake</p>
          </div>
          {/* Current Store */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">Current Store</label>
            <p className="text-gray-900">Ogo Pastries</p>
          </div>
          {/* Current Category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Current Category</label>
            <p className="text-gray-900">Cake</p>
          </div>
          {/* Destination Store */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">Destination Store</label>
            <select
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-imsLightPurple focus:border-imsLightPurple"
            >
              <option>Select Destination Store</option>
              {/* Add options here */}
            </select>
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
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 my-2">Destination Category</label>
            <select
              className="w-full border-gray-300 py-2 px-1 border rounded-lg shadow-sm focus:ring-imsLightPurple focus:border-imsLightPurple"
            >
              <option>Select Destination Category</option>
              {/* Add options here */}
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
