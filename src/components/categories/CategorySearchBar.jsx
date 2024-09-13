import React from 'react'

const CategorySearchBar = () => {
  return (
    <div className="p-4  shadow-md rounded-md bg-gray-200">
      <div className="flex space-x-2">
        {/* Input field */}
        <input
          type="text"
          placeholder="Search category..."
          className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-imsDarkPurple"
        />

        {/* Select dropdown */}
        <select className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-imsDarkPurple">
          <option>Select Store</option>
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
