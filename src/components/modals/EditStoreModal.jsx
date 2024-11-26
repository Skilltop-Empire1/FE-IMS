import React, { useState, useEffect } from 'react';

const EditStoreModal = ({ store, onClose, onUpdate }) => {
  const [storeName, setStoreName] = useState(store.storeName);
  const [location, setLocation] = useState(store.location);
  const [noOfStaff, setNoOfStaff] = useState(store.noOfStaff);
  const [storeManager, setStoreManager] = useState(store.storeManager);
  const [storeContact, setStoreContact] = useState(store.storeContact);
  const [storePhoto, setStorePhoto] = useState(store.storePhoto); // Initial photo URL
  const [newPhotoFile, setNewPhotoFile] = useState(null); // New photo file for upload

  // Display image preview when a new file is selected
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPhotoFile(file);
      setStorePhoto(URL.createObjectURL(file)); // Show image preview
    }
  };

  const handleSubmit = () => {
    const updatedData = new FormData();
    updatedData.append('storeName', storeName);
    updatedData.append('location', location);
    updatedData.append('noOfStaff', noOfStaff);
    updatedData.append('storeManager', storeManager);
    updatedData.append('storeContact', storeContact);
    if (newPhotoFile) {
      updatedData.append('storePhoto', newPhotoFile); // Append only if a new photo is selected
    }

    onUpdate(updatedData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md mx-4 p-6 rounded-lg shadow-lg relative h-96 overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Edit Store</h3>
        
        {/* Form Fields */}
        <div className="space-y-4">
          {/* Store Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Number of Staff Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Staff</label>
            <input
              type="number"
              value={noOfStaff}
              onChange={(e) => setNoOfStaff(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Manager Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Manager</label>
            <input
              type="text"
              value={storeManager}
              onChange={(e) => setStoreManager(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Contact Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              value={storeContact}
              onChange={(e) => setStoreContact(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload with Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            {storePhoto && (
              <img src={storePhoto} alt="Store Preview" className="mt-2 h-32 w-32 object-cover rounded-md shadow-sm" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="flex-grow rounded-full bg-red-100 px-8 py-2.5 text-center text-xs font-medium hover:bg-red-200 focus:outline-none focus:ring-1 focus:ring-red-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="text-white text-center flex-grow bg-imsPurple rounded-full font-semibold px-8 py-2.5 text-xs focus:ring-imsLightPurple focus:ring-offset-2 focus:ring-1"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStoreModal;
