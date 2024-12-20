import React, { useState, useEffect } from 'react'
import Filter from '../../components/Filter/Filter'
import Table from '../../components/Table/Table'
import { useGetLocationsQuery } from '../../redux/APIs/storeApi'
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from '../../redux/APIs/productApi'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import EditProductModal from '../../components/modals/EditProductModal'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const SalesRecord = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [productIdToDelete, setProductIdToDelete] = useState(null)
  const [productToUpdate, setProductToUpdate] = useState(null)

  // Fetch products using RTK Query
  const { data: products, error, isLoading, isFetching, refetch } = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  // console.log('Product', products)

  // Fetch locations
  const {
    data: locations,
    error: locationError,
    isLoading: locationLoading,

  } = useGetLocationsQuery()

  // Handle delete product action
  const handleDeleteProduct = (prodId) => {
    setProductIdToDelete(prodId)
    setShowModal(true)
  }

  const confirmDeleteProduct = () => {
    if (!productIdToDelete) {
      alert('No product selected for deletion')
      return
    }

    deleteProduct(productIdToDelete).unwrap() // Ensure correct productIdToDelete is passed here
      // navigate = useNavigate()
      .then(() => {
        alert('Product deleted successfully!')
        window.location.reload(false)
        setShowModal(false)
        setProductIdToDelete(null)
      })
      .catch((error) => {
        console.error('Delete error:', error)
        alert('Error deleting product: ' + error?.data?.message)
      })
  }

  // Handle product update
  const handleProductUpdate = (product) => {
    setProductToUpdate(product)
    setShowUpdateModal(true)
  }

  // const confirmUpdateProduct = (updatedData) => {
  //   if (!productToUpdate) {
  //     alert('No product selected for update');
  //     return;
  //   }

  //   if (!productToUpdate.prodId) {
  //     alert('Product ID is not defined');
  //     return;
  //   }

  //   const formData = new FormData();
  //   Object.entries(updatedData).forEach(([key, value]) => {
  //     formData.append(key, value);
  //   });

  //   updateProduct({ prodId: productToUpdate.prodId, updatedProduct: formData })
  //     .then(() => {
  //       alert('Product updated successfully!');
  //       setShowUpdateModal(false);
  //       setProductToUpdate(null);
  //     })
  //     .catch((error) => {
  //       console.error("Update error:", error);
  //       alert('Error updating product: ' + error.message);
  //     });
  // };

  const confirmUpdateProduct = (updatedData) => {
    if (!productToUpdate) {
      alert('No product selected for update')
      return
    }

    const requiredFields = [
      'prodId',
      'name',
      'price',
      'itemCode',
      'prodPhoto',
      'alertStatus',
      'quantity',
      'categoryId',
      'storeAvailable',
    ]

    for (const field of requiredFields) {
      if (!updatedData[field]) {
        alert(`Missing required field: ${field}`)
        return
      }
    }

    const currentDate = new Date().toLocaleDateString() // Formats the date

    const formData = new FormData()
    formData.append('name', updatedData.name || productToUpdate.name)
    formData.append('price', updatedData.price || productToUpdate.price)
    formData.append(
      'itemCode',
      updatedData.itemCode || productToUpdate.itemCode,
    )
    formData.append(
      'alertStatus',
      updatedData.alertStatus || productToUpdate.alertStatus,
    )
    formData.append(
      'quantity',
      updatedData.quantity || productToUpdate.quantity,
    )
    formData.append(
      'categoryId',
      updatedData.categoryId || productToUpdate.categoryId,
    )
    formData.append('storeId', updatedData.storeId || productToUpdate.storeId)
    formData.append(
      'storeAvailable',
      updatedData.storeAvailable || productToUpdate.storeAvailable,
    )


    // Handle file upload
    if (updatedData.prodPhoto instanceof File) {
      formData.append('prodPhoto', updatedData.prodPhoto)
    }




    // Call updateProduct function
    updateProduct({ prodId: productToUpdate.prodId, updatedProduct: formData })
      .then((response) => {
        if (response.data) {
          refetch()
          alert('Product updated successfully!')
          setShowUpdateModal(false)
          setProductToUpdate(null)

        } else {
          alert(
            'Error updating product: ' +
            (response.error?.data?.message || 'Unknown error'),
          )
        }
      })
      .catch((error) => {
        console.error('Update error:', error)
        // Handle errors caught by the catch block
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          alert('Error updating product: ' + error.response.data.message)
        } else if (error.message) {
          alert('Error updating product: ' + error.message)
        } else {
          alert('Error updating product: An unknown error occurred')
        }
      })
  }

  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase())
  }

  // Handle filter selection
  const handleFilter = (category) => {
    setFilterCategory(category)
  }

  const sortedData = products?.slice().sort((a, b) => {
    const nameA = a.name || ''
    const nameB = b.name || ''
    return nameA.localeCompare(nameB)
  })

  // Filter products based on search term and selected category
  const filteredItems = sortedData?.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm)
    const matchesCategory =
      filterCategory === 'all' || item.category === filterCategory

    return matchesSearch && matchesCategory
  })


  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/app/products') {
      refetch(); // Refetch stores when the user switches
    }
  }, [location.pathname, refetch]);

  return (
    <div>
      {/* Filter Section */}
      <Filter
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        direction="/app/addProduct"
        title="Products"
        button="+ Add Product"
        location={locations}
        search="Search by name"
        display="hidden"
      />

      {/* Products Table Section */}
      {isLoading || isFetching ? (
        <div className='animate-pulse'>
          <table className='w-full' >
            <thead>
              <tr className='text-'>
                <th> </th>
                <th>Product Photo</th>
                <th>Product Name</th>
                <th>Alert status</th>
                <th>Quantity</th>
                <th>Unit price</th>
                <th>Category</th>
                <th>Store Name</th>
                <th>Date added</th>
                <th>Transfer</th>
                <th>Action</th>
              </tr>
            </thead>

          </table>
          {Array(5).fill().map((_, i) => (
            <div key={i} className="rounded-2xl bg-slate-200 h-10 w-full mt-3"></div>
          ))}
        </div>
      ) : error ? (
        <p className='text-red-500'>Error loading products. {error.data?.message || "An error occurred"}</p>

      ) : (
        <Table
          status="Alert Status"
          date="Date added"
          api={filteredItems}
          record="hidden"
          deleted={(id) => handleDeleteProduct(id)} // Pass product ID to the handleDeleteProduct function
          updated={(product) => handleProductUpdate(product)}
        />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        title={'product'}
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={confirmDeleteProduct}
      />

      <EditProductModal
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        productToUpdate={productToUpdate}
        confirmUpdateProduct={confirmUpdateProduct}
      />
    </div>
  )
}

export default SalesRecord
