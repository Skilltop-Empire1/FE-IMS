import React, { useState, useEffect, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Filter from '../../components/Filter/Filter'
import Table from '../../components/Table/Table2'
import { useGetLocationsQuery } from '../../redux/APIs/storeApi'
import {
  useGetSalesRecordQuery,
  useDeleteSalesRecordMutation,
  useUpdateSalesRecordMutation,
} from '../../redux/APIs/salesRecordApi'
import ConfirmationModal from '../../components/modals/ConfirmationModal'
import EditSalesRecordModal from '../../components/modals/EditSalesRecordModal'
import ViewSaleRecordModal from '../../components/modals/ViewSaleRecordModal'
import { useLocation } from 'react-router'
import { NavLink } from 'react-router-dom'
import { Download, PlusIcon } from 'lucide-react'

const SalesRecord = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [salesRecordIdToDelete, setSalesRecordIdToDelete] = useState(null)
  const [salesRecordToUpdate, setSalesRecordToUpdate] = useState(null)
  const [salesRecordToView, setSalesRecordToView] = useState(null)
  const [selectedRows, setSelectedRows] = useState([]);

  const {
    data: salesRecord,
    error: salesError,
    isLoading: salesLoading,
    refetch,
    isFetching,
  } = useGetSalesRecordQuery()
  const [deleteSalesRecord] = useDeleteSalesRecordMutation()
  const [updateSalesRecord] = useUpdateSalesRecordMutation()
  const {
    data: locations,
    error: locationError,
    isLoading: locationLoading,
  } = useGetLocationsQuery()

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase())
  }

  const handleFilter = (category) => {
    setFilterCategory(category)
  }

  const viewToUpdate = (record) => {
    setShowUpdateModal(true)
    setShowViewModal(false)
    setSalesRecordToUpdate(record)
  }

  const handleDeleteSalesRecord = (id) => {
    setSalesRecordIdToDelete(id)
    setShowModal(true)
  }

  const confirmDeleteSalesRecord = async () => {
    if (!salesRecordIdToDelete) {
      alert('No record selected for deletion')
      return
    }

    try {
      await deleteSalesRecord(salesRecordIdToDelete).unwrap()
      alert('Record deleted successfully!')
      setShowModal(false)
      setSalesRecordIdToDelete(null)
      refetch() // Refresh sales records after deletion
    } catch (error) {
      // console.error('Error deleting record:', error)
      alert(`Error deleting record. ${error.data.message}`)
    }
  }

  const handleUpdateSalesRecord = (record) => {
    setSalesRecordToUpdate(record)
    setShowUpdateModal(true)
  }  
  const handleViewSalesRecord = (record) => {
    setSalesRecordToView(record)
    setShowViewModal(true)
  }

  const confirmUpdateSalesRecord = async (updatedData) => {
    if (!salesRecordToUpdate || !salesRecordToUpdate.saleId) {
      alert('No record selected for update')
      return
    }

    updateSalesRecord({ id: salesRecordToUpdate.saleId, updatedData }).unwrap() // Use the correct saleId
      .then(() => {
        alert('Record updated successfully!')
        setShowUpdateModal(false)
        setSalesRecordToUpdate(null)
        refetch()
      })
      .catch((error) => alert(`Error updating record. ${error.data?.message}`))
  }

  //filter

  const filteredItems = salesRecord?.data?.filter((item) => {
    const matchesSearch = item?.Product?.name
      ?.toLowerCase()
      .includes(searchTerm)
    // const matchesCategory = filterCategory === 'all' || item.category === filterCategory;

    return matchesSearch
  })

  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/app/salesRecords') {
      refetch() // Refetch stores when the user switches
    }
  }, [location.pathname, refetch])


  const clearSelectedRows = () => {
    setSelectedRows([])
  }

  //print functionality 
  const contentRef = useRef();
  const handlePrint = useReactToPrint({
      contentRef,
      onAfterPrint: clearSelectedRows,
});




  //selcting items to print
  const toggleRowSelection = (saleId) => {
          setSelectedRows((prevSelected) =>
            prevSelected.includes(saleId)
              ? prevSelected.filter((id) => id !== saleId)
              : [...prevSelected, saleId]
          );
        };
  
    const selectAllRows = (isChecked) => {
        setSelectedRows(isChecked ? currentData.map((item) => item.saleId) : []);
    };


  return (
    <div>
      <Filter
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        direction="/app/addSaleRecord"
        title="Sales Record"
        button={<PlusIcon/>}
        text='Add Sales'
        location={locations}
        categories={categories}
        search="search by product name"
        display="hidden"
        print={handlePrint}
      />

      {salesLoading || locationLoading ? (
        <div className=" animate-pulse">
          <table className="w-full">
            <thead>
              <tr>
              <th>Product Photo</th>
              <th>Product Name</th>
              <th>Payment Option</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Store Name</th>
              <th>Sold Date</th>
              <th>Action</th>
              </tr>
            </thead>
          </table>
          {Array(5).fill().map((_, i) => (
            <div key={i} className="rounded-2xl bg-slate-200 h-10 w-full mt-3"></div>
          ))}
        </div>
      ) : salesError || locationError ? (
        <div className="text-red-500">
           <p>Error loading data. {salesError?.data?.message || "An error occurred"}</p>
        
            {/* {salesError?.data?.message || "An error occurred"} */}
          </div>
        
       
      ) : (
        <Table 
          status='Payment method' 
          date=' Sold Date' 
          api={filteredItems} 
          deleted={handleDeleteSalesRecord} 
          updated={handleUpdateSalesRecord} 
          view={handleViewSalesRecord}
          printref={contentRef}
          selectedRows={selectedRows}
          toggleRowSelection={toggleRowSelection}
          selectAllRows={selectAllRows}
          
        />
      )}
        {/* <NavLink to={'/app/invoice'}>
          invoice
        </NavLink> */}

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
      <ViewSaleRecordModal
        showModal={showViewModal}
        setShowModal={setShowViewModal}
        record={salesRecordToView}
        handleUpdate={viewToUpdate}
      />
    </div>
  )
}

export default SalesRecord
