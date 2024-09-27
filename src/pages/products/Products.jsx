import React, { useState, useEffect } from 'react';
import Filter from '../../components/Filter/Filter';
import Table from '../../components/Table/Table';
import { useGetLocationsQuery } from '../../redux/APIs/storeApi';
import { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from '../../redux/APIs/productApi';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import EditProductModal from '../../components/modals/EditProductModal';

const SalesRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null); // Track which product to delete
  const [productToUpdate, setProductToUpdate] = useState(null);



  // Fetch products using RTK Query
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();





  // Fetch locations
  const { data: locations, error: locationError, isLoading: locationLoading } = useGetLocationsQuery();





  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        'https://be-ims.onrender.com/api/IMS/store/filter',
      )
      const data = await response.json()
      setCategories(data.categories)
    }

    fetchCategories();
  }, []);






  // Handle delete product action
  const handleDeleteProduct = (prodId) => {
    setProductIdToDelete(prodId); // Set the ID of the product to be deleted
    setShowModal(true); // Show the confirmation modal
  };

  const confirmDeleteProduct = () => {
    if (!productIdToDelete) {
      alert('No product selected for deletion');
      return;
    }

    console.log("Attempting to delete product with ID:", productIdToDelete); // Debugging log

    deleteProduct(productIdToDelete) // Ensure correct productIdToDelete is passed here
      .then(() => {
        alert('Product deleted successfully!');
        setShowModal(false);
        setProductIdToDelete(null);
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert('Error deleting product: ' + error.message);
      });
  };





  //handle product update
  const handleProductUpdate = (product) => {
    console.log("Selected product for update:", product);
    setProductToUpdate(product);
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
      alert('No product selected for update');
      return;
    }

    if (!productToUpdate.prodId) {
      alert('Product ID is not defined');
      return;
    }
  
    const formData = new FormData();
  
    // Add all required fields to formData
    formData.append('prodId', productToUpdate.prodId); // Ensure you have the product ID
    formData.append('name', updatedData.name);
    formData.append('price', updatedData.price);
    formData.append('itemCode', updatedData.itemCode);
    formData.append('prodPhoto', updatedData.prodPhoto); // Ensure this is the correct file or URL
    formData.append('alertStatus', updatedData.alertStatus);
    formData.append('quantity', updatedData.quantity);
    formData.append('categoryId', updatedData.categoryId); // Assuming this is the correct field
    formData.append('storeId', updatedData.storeAvailable); // Make sure storeId corresponds with what your backend expects
  
    // Log the formData to debug
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  
    updateProduct({ prodId: productToUpdate.prodId, updatedProduct: formData })
      .then(() => {
        alert('Product updated successfully!');
        setShowUpdateModal(false);
        setProductToUpdate(null);
      })
      .catch((error) => {
        console.error("Update error:", error);
        alert('Error updating product: ' + error.message);
      });
  };
  
  




  // Handle search input
  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };




  // Handle filter selection
  const handleFilter = (category) => {
    setFilterCategory(category);
  };

  const sortedData = products?.slice().sort((a, b) => {
    const nameA = a.name || '';
    const nameB = b.name || '';
    return nameA.localeCompare(nameB);
  });




  // Filter products based on search term and selected category
  const filteredItems = sortedData?.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesCategory;
  });




  return (
    <div>
      {/* Filter Section */}
      <Filter
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        direction="addProduct"
        title="Products"
        button="+ Add Product"
        location={locations} // Pass categories to the Filter component
        search="Search by name"
      />

      {/* Products Table Section */}
      {
        isLoading ? ( 
          <p>Loading...</p> 
        ) : error ? ( 
          <p>Error loading products</p> 
        ) : (
          <Table 
            status='Alert Status' 
            date='Date added' 
            api={filteredItems} 
            record ='hidden' 
            deleted={(id) => handleDeleteProduct(id)}  // Pass product ID to the handleDeleteProduct function
            updated={(product) => handleProductUpdate(product)}
          />
        )
      }

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
  );
};

export default SalesRecord
