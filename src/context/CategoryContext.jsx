import React, { createContext, useContext, useState } from 'react'
import { useDeleteCategoryMutation } from '../redux/categoryApi'

// Create the Category Context
const CategoryContext = createContext()

// Create a custom hook to access the Category Context
export const useCategory = () => useContext(CategoryContext)

// Category Provider component
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [deleteCategoryMutation] = useDeleteCategoryMutation()
  const [refetchCategories, setRefetchCategories] = useState(null)

  // Function to select a category
  const selectCategory = (category) => {
    setSelectedCategory(category)
  }

  // Function to delete the selected category
  const deleteCategory = async () => {
    if (!selectedCategory) return

    const confirmDeleteResponse = confirm(
      'Are you sure you want to delete this category ?',
    )
    if (confirmDeleteResponse) {
      try {
        await deleteCategoryMutation(selectedCategory.catId).unwrap() // Perform the mutation
        setSelectedCategory(null) // Clear the selection after deletion
        // Check if refetchCategories is a function before calling
        if (typeof refetchCategories === 'function') {
          refetchCategories()
        }

        alert('Category deleted successfully!')
      } catch (error) {
        console.error(
          'Failed to delete category as it contains products',
          error,
        )
        alert('Error deleting category.')
      }
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        selectCategory,
        deleteCategory,
        setRefetchCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
