import React, { useState, useEffect } from 'react'
import { useGetCategoriesQuery } from '../../redux/categoryApi' // Adjust the import path as needed

const placeholderImage = 'https://via.placeholder.com/150x250/B990E9/FFFFFF'

const CategoryGridSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="p-4">
            <div className="h-5 bg-gray-300 mb-2 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

const CategoryGrid = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Fetch categories using the useGetCategoriesQuery hook
  const { data, error, isLoading } = useGetCategoriesQuery({
    page: currentPage,
    limit: itemsPerPage,
  })
  const categories = data?.categories

  const totalPages = categories ? Math.ceil(categories.total / itemsPerPage) : 1

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <div className="container mx-auto my-10 p-4">
      {/* Skeleton Loader or Category Grid */}
      {isLoading ? (
        <CategoryGridSkeleton />
      ) : error ? (
        <p className="text-red-500">Failed to load categories</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {categories?.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={category.image_url || placeholderImage}
                alt={category.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-semibold">{category.name}</h3>
                <p className="text-gray-400 text-sm">
                  {category.productCount} Items
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      {/* <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={prevPage}
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 ${
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className={`px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 ${
            currentPage === totalPages && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div> */}
    </div>
  )
}

export default CategoryGrid
