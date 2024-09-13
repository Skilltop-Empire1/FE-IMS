import React, { useState } from 'react'

// Placeholder categories data
const categories = [
  { id: 1, title: 'Bottoms', items: '7' },
  { id: 2, title: 'Coats', items: '6' },
  { id: 3, title: 'Jeans', items: '8' },
  { id: 4, title: 'Tops', items: '9' },
  { id: 5, title: 'T-Shirt', items: '1' },
  { id: 6, title: 'Bottoms', items: '4' },
  { id: 7, title: 'Coats', items: '5' },
  { id: 8, title: 'Jeans', items: '3' },
  { id: 9, title: 'Tops', items: '2' },
  { id: 10, title: 'T-Shirt', items: '8' },
  { id: 11, title: 'T-Shirt', items: '5' },
  { id: 12, title: 'T-Shirt', items: '7' },
]

// Placeholder image
const placeholderImage = 'https://via.placeholder.com/150x250/B990E9/FFFFFF'

const CategoryGrid = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(categories.length / itemsPerPage)

  // Navigate to the next page
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  // Navigate to the previous page
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="container mx-auto my-10 p-4">
      {/* Responsive grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {currentItems.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Placeholder image */}
            <img
              src={placeholderImage}
              alt={category.title}
              className="w-full h-48 object-cover"
            />
            {/* Content */}
            <div className="p-4">
              <h3 className="text-base font-semibold">{category.title}</h3>
              <p className="text-gray-400 text-sm">{category.items} Items</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={prevPage}
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CategoryGrid
