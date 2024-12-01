import React, { useState, useMemo } from 'react'
import Table from '../../../components/expenseTable/Table'
import style from './Capex.module.css'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetCapexQuery } from '../../../redux/APIs/accountApi'
import ViewCapexModal from '../../../modals/viewModal/ViewCapexModal'
import EditCapexModal from '../../../modals/editModal/EditCapexModal'
import DeleteModal from '../../../modals/deleteModal/DeleteModal'
import ModalContainer from '../../../modals/ModalContainer'

// Modal Types Constants
const MODAL_TYPES = {
  VIEW: 'capex-view',
  EDIT: 'capex-edit',
  DELETE: 'delete',
}

function Capex() {
  const { data: capexData = [], isLoading, isError } = useGetCapexQuery()
  const navigate = useNavigate()

  const [modalType, setModalType] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState('') // State for search query

  const openModal = (type, item = null) => {
    setModalType(type)
    setActiveItem(item)
  }

  const closeModal = () => {
    setModalType(null)
    setActiveItem(null)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Memoize filtered data to avoid unnecessary recalculations
  const filteredData = useMemo(() => {
    return capexData.filter(
      (item) =>
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [capexData, searchQuery])

  const totalAmount = capexData.reduce((acc, item) => {
    return acc + item.amount
  }, 0)

  const headers = [
    'CAPEX Categories',
    'Item/Asset Description',
    'Amount',
    '% of Total Capex',
    'Acquisition Date',
    'Expected Life Span',
    'Depreciation Rate',
    'Action',
  ]

  const renderRow = (item) => {
    const formattedDate = new Date(item.dateOfExpense).toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
    )

    const percentOfTotalCapex = ((item.amount / totalAmount) * 100).toFixed(2)

    return (
      <>
        <td>{item.category}</td>
        <td>{item.description}</td>
        <td>{item.amount}</td>
        <td>{percentOfTotalCapex}%</td>
        <td>{formattedDate}</td>
        <td>{item.expectedLifespan}</td>
        <td>{item.annualDepreciation}</td>
      </>
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data. Please try again later.</div>
  }

  return (
    <div className={style.container}>
      <div>
        <div className={style.titleContainer}>
          <h3>Capex Expense Record</h3>
          <div className={style.searchContainer}>
            <div className={style.searchBar}>
              <Search color="#6D6D6D" size="24px" />
              <input
                type="text"
                value={searchQuery} // Bind the input to searchQuery
                onChange={handleSearchChange} // Update the search query on change
                placeholder="Search by category or description"
                aria-label="Search capital expenses" // Accessibility improvement
              />
            </div>
            <button
              className={style.addButton} // Styled for prominence
              onClick={() => navigate('/app/accounts/capex/add-capex')}
            >
              + Add Expense
            </button>
          </div>
        </div>
      </div>

      <div>
        <Table
          totalAmount={totalAmount}
          renderRow={renderRow}
          getId={(item) => item.expendId}
          data={filteredData} // Use the filtered data for the table
          headers={headers}
          handleEdit={(item) => openModal(MODAL_TYPES.EDIT, item)} // Pass the correct modal type for edit
          handleDelete={(item) => openModal(MODAL_TYPES.DELETE, item)} // Pass the correct modal type for delete
          handleView={(item) => openModal(MODAL_TYPES.VIEW, item)} // Pass the correct modal type for view
        />
      </div>

      {/* Modal containers */}
      <ModalContainer
        isOpen={modalType === MODAL_TYPES.EDIT}
        onClose={closeModal}
        content={
          <EditCapexModal closeModal={closeModal} editData={activeItem} />
        }
      />
      <ModalContainer
        isOpen={modalType === MODAL_TYPES.VIEW}
        onClose={closeModal}
        content={
          <ViewCapexModal
            openEditModal={(item) => openModal(MODAL_TYPES.EDIT, item)}
            closeModal={closeModal}
            formData={activeItem}
          />
        }
      />
      <ModalContainer
        isOpen={modalType === MODAL_TYPES.DELETE}
        onClose={closeModal}
        content={<DeleteModal recordToDelete={activeItem} />}
      />
    </div>
  )
}

export default Capex
