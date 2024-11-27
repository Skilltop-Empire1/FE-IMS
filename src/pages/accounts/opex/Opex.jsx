import React, { useState, useMemo } from 'react'
import Table from '../../../components/expenseTable/Table'
import style from './Opex.module.css'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetOpexQuery } from '../../../redux/APIs/accountApi'
import ViewOpexModal from '../../../modals/viewModal/ViewOpexModal'
import EditOpexModal from '../../../modals/editModal/EditOpexModal'
import DeleteModal from '../../../modals/deleteModal/DeleteModal'
import ModalContainer from '../../../modals/ModalContainer'

// Modal Types Constants
const MODAL_TYPES = {
  VIEW: 'opex-view',
  EDIT: 'opex-edit',
  DELETE: 'delete',
}

function Opex() {
  const { data: opexData = [], isLoading, isError } = useGetOpexQuery()
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
    return opexData.filter(
      (item) =>
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [opexData, searchQuery])

  const headers = [
    'OPEX Category',
    'Expense Description',
    'Amount',
    '% of Total OPEX',
    'Month-over-Month Change',
    'Action',
  ]

  const renderRow = (item) => (
    <>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.amount}</td>
      <td>{item.percentage}</td>
      <td>{item.monthChange}</td>
    </>
  )

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
          <h3>Opex Expense Record</h3>
          <div className={style.searchContainer}>
            <div className={style.searchBar}>
              <Search color="#6D6D6D" size="24px" />
              <input
                type="text"
                value={searchQuery} // Bind the input to searchQuery
                onChange={handleSearchChange} // Update the search query on change
                placeholder="Search by category or description"
                aria-label="Search expenses" // Accessibility improvement
              />
            </div>
            <button
              className={style.addButton} // Styled for prominence
              onClick={() => navigate('/app/accounts/opex/add-opex')}
            >
              + Add Expense
            </button>
          </div>
        </div>
      </div>

      <div>
        {filteredData.length === 0 && (
          <div>No expenses found for the search criteria.</div>
        )}
        <Table
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
        content={<EditOpexModal closeModal={closeModal} item={activeItem} />}
      />
      <ModalContainer
        isOpen={modalType === MODAL_TYPES.VIEW}
        onClose={closeModal}
        content={
          <ViewOpexModal
            openEditModal={(item) => openModal(MODAL_TYPES.EDIT, item)}
            closeModal={closeModal}
            formData={activeItem}
          />
        }
      />
      <ModalContainer
        isOpen={modalType === MODAL_TYPES.DELETE}
        onClose={closeModal}
        content={<DeleteModal item={activeItem} />}
      />
    </div>
  )
}

export default Opex
