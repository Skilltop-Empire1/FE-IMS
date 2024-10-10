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
  const [salesRecordToUpdate, setSalesRecordToUpdate] = useState(null);
  
  const { data: salesRecord, error: salesError, isLoading: salesLoading, refetch } = useGetSalesRecordQuery();
  const [deleteSalesRecord] = useDeleteSalesRecordMutation();
  const [updateSalesRecord] = useUpdateSalesRecordMutation();
  const { data: locations, error: locationError, isLoading: locationLoading } = useGetLocationsQuery();

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  }

  const handleFilter = (category) => {
    setFilterCategory(category);
  }

  const handleDeleteSalesRecord = (id) => {
    setSalesRecordIdToDelete(id);
    setShowModal(true);
  };

  const confirmDeleteSalesRecord = async () => {
    if (!salesRecordIdToDelete) {
      alert('No record selected for deletion');
      return;
    }

    try {
      await deleteSalesRecord(salesRecordIdToDelete).unwrap();
      alert('Record deleted successfully!');
      setShowModal(false);
      setSalesRecordIdToDelete(null);
      refetch(); // Refresh sales records after deletion
    } catch (error) {
      console.error('Error deleting record:', error);
      alert('Error deleting record');
    }
  };

  const handleUpdateSalesRecord = (record) => {
    setSalesRecordToUpdate(record);
    setShowUpdateModal(true);
  };

  const confirmUpdateSalesRecord = async (updatedData) => {
    if (!salesRecordToUpdate || !salesRecordToUpdate.saleId) {
      alert('No record selected for update');
      return;
    }

    try {
      await updateSalesRecord({ id: salesRecordToUpdate.saleId, updatedData }).unwrap();
      alert('Record updated successfully!');
      setShowUpdateModal(false);
      setSalesRecordToUpdate(null);
      refetch(); // Refresh sales records after updating
    } catch (error) {
      console.error('Error updating record:', error);
      alert('Error updating record');
    }
  };

  // const filteredItems = salesRecord?.filter((item) => {
  //   const matchesSearch = item.Product.name.toLowerCase().includes(searchTerm);
  //   // const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

  //   return matchesSearch ;
  // });

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
      
      {salesLoading || locationLoading ? ( 
        <div className='animate-pulse'>
          <table className='w-full'>
            <thead>
              <tr>
                <th></th>
                <th>Product Photo</th>
                <th>Product Name</th>
                <th>Alert Status</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Store Name</th>
                <th>Date Added</th>
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
          api={salesRecord} 
          deleted={handleDeleteSalesRecord} 
          updated={handleUpdateSalesRecord} 
        />
      )}

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

export default SalesRecord;
