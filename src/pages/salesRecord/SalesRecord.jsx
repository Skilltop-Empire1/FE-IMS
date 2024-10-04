import React, { useState, useEffect } from 'react';
import Filter from '../../components/Filter/Filter';
import Table from '../../components/Table/Table2';
import { useGetLocationsQuery } from '../../redux/APIs/storeApi';
import { useGetSalesRecordQuery, useDeleteSalesRecordMutation, useUpdateSalesRecordMutation } from '../../redux/APIs/salesRecordApi';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import EditSalesRecordModal from '../../components/modals/EditSalesRecordModal';

const SalesRecord = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [salesRecordIdToDelete, setSalesRecordIdToDelete] = useState(null);
  const [salesRecordToUpdate, setSalesRecordToUpdate] = useState(null); // Track record to update
  const { data: salesRecord, error: salesError, isLoading: salesLoading, refetch } = useGetSalesRecordQuery();
  const [deleteSalesRecord] = useDeleteSalesRecordMutation();
  const [updateSalesRecord] = useUpdateSalesRecordMutation();

  const { data: locations, error: locationError, isLoading: locationLoading } = useGetLocationsQuery();

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const response = await fetch(
  //       'https://be-ims.onrender.com  /api/IMS/store/filter',
  //     )
  //     const data = await response.json()
  //     setCategories(data.categories)
  //   }

  //   fetchCategories()
  // }, [])

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase())
  }

  const handleFilter = (category) => {
    setFilterCategory(category)
  }

  const handleDeleteSalesRecord = (id) => {
    setSalesRecordIdToDelete(id);
    setShowModal(true);
  };

  const confirmDeleteSalesRecord = () => {
    if (!salesRecordIdToDelete) {
      alert('No record selected for deletion');
      return;
    }

    deleteSalesRecord(salesRecordIdToDelete)
      .then(() => {
        alert('Record deleted successfully!');
        window.location.reload(false)
        setShowModal(false);
        setSalesRecordIdToDelete(null);
      })
      .catch((error) => alert('Error deleting record'));
  };

  //sales record update

  const handleUpdateSalesRecord = (record) => {
    setSalesRecordToUpdate(record);
    setShowUpdateModal(true);
  };

  const confirmUpdateSalesRecord = (updatedData) => {
    if (!salesRecordToUpdate || !salesRecordToUpdate.saleId) { // Ensure there's a valid saleId
      alert('No record selected for update');
      return;
    }
  
    updateSalesRecord({ id: salesRecordToUpdate.saleId, updatedData }) // Use the correct saleId
      .then(() => {
        alert('Record updated successfully!');
        setShowUpdateModal(false);
        setSalesRecordToUpdate(null);
        refetch();
      })
      .catch((error) => alert('Error updating record'));
  };
  



  //filter

  const filteredItems = salesRecord?.filter((item) => {
    const matchesSearch = item.Product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch && matchesCategory
  })

  return (
    <div>
      <Filter 
        handleSearch={handleSearch} 
        handleFilter={handleFilter} 
        direction='/app/addSaleRecord' 
        title='Sales Record' 
        button='+ Add Sales' 
        location={locations}  
        categories={categories}  
        search='search by product name'
        display='hidden'
      />
      
      {
        salesLoading || locationLoading ? ( 
          <div className=' animate-pulse'>
            <table className='w-full' >
              <thead>
              <tr className='text-'>
                <th> </th>
                  <th>Product Photo</th>
                  <th>Product Name</th>
                  <th>Alert status</th>
                  <th>Quantity</th>
                  <th>Category</th>
                  <th>Store Name</th>
                  <th>Date added</th>
                  <th>Action</th> 
                </tr>
              </thead>

            </table>
            <div className="rounded-2xl bg-slate-200 h-10 w-full mt-3"></div>
            <div className="rounded-2xl bg-slate-200 h-10 w-full mt-3"></div>
            <div className="rounded-2xl bg-slate-200 h-10 w-full mt-3"></div>
            <div className="rounded-2xl bg-slate-200 h-10 w-full mt-3"></div>
            <div className="rounded-2xl bg-slate-200 h-10 w-full mt-3"></div>
          </div>
        ) : salesError || locationError ? ( 
          <p>Error loading data</p> 
        ) : (
          <Table 
            status='Payment method' 
            date='Date added' 
            api={filteredItems} 
            deleted={(id) => handleDeleteSalesRecord(id)} 
            updated={(record) => handleUpdateSalesRecord(record)} // Pass product record to update handler
          />
        )
      }

      <ConfirmationModal 
        title={'sale record'}
        showModal={showModal} 
        setShowModal={setShowModal} 
        handleDelete={confirmDeleteSalesRecord}  
      />
      <EditSalesRecordModal
        showModal={showUpdateModal} 
        setShowModal={setShowUpdateModal} 
        record={salesRecordToUpdate} 
        handleUpdate={confirmUpdateSalesRecord} 
      />
    </div>
  );
};

export default SalesRecord
