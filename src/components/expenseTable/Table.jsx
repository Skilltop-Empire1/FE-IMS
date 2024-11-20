import React, { useEffect, useRef, useState, useCallback } from 'react'
import ViewOpexModal from '../../modals/viewModal/ViewOpexModal'
import EditOpexModal from '../../modals/editModal/EditOpexModal'
import DeleteModal from '../../modals/deleteModal/DeleteModal'
import style from './Table.module.css'
import {
  LoaderIcon,
  MoreHorizontal,
  Eye,
  Pencil,
  Printer,
  Trash2,
} from 'lucide-react'
import ModalContainer from '../../modals/ModalContainer'
import ViewCapexModal from '../../modals/viewModal/ViewCapexModal'
import EditCapexModal from '../../modals/editModal/EditCapexModal'

const ActionCell = React.memo(({ item, onView, onEdit, onDelete, onPrint }) => (
  <ul className={style.buttonRow}>
    <li onClick={() => onView(item)}>
      <Eye size={16} /> <span>View</span>
    </li>
    <hr />
    <li onClick={() => onEdit(item)}>
      <Pencil size={16} /> <span>Edit</span>
    </li>
    <hr />
    <li onClick={() => onPrint(item)}>
      <Printer size={16} /> <span>Print</span>
    </li>
    <hr />
    <li onClick={() => onDelete(item)}>
      <Trash2 size={16} /> <span>Delete</span>
    </li>
  </ul>
))

function Table({
  headers,
  data,
  itemsPerPage = 5,
  isLoading,
  renderRow,
  error,
  getId,
  totalAmount,
  totalMomChange,
  totalPercentOpex,
  fetchData, // Assuming this is the function to fetch data
  modalTypePrefix = 'opex', // Dynamic modal prefix (e.g. 'capex' or 'opex')
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeActionCell, setActiveActionCell] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const actionDropDownRef = useRef(null)
  const actionIconRef = useRef(null)

  const handleClickOutsideDropdown = (event) => {
    if (
      actionDropDownRef.current &&
      !actionDropDownRef.current.contains(event.target) &&
      actionIconRef.current &&
      !actionIconRef.current.contains(event.target)
    ) {
      setActiveActionCell(null)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideDropdown)
    return () => {
      document.removeEventListener('click', handleClickOutsideDropdown)
    }
  }, [])

  // Safeguard against undefined data
  if (!data || data.length === 0) {
    return <p>No data available to display.</p>
  }

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const openModal = (type, item) => () => {
    setModalType(`${modalTypePrefix}-${type}`)
    setActiveItem(item)
  }

  const closeModal = () => {
    setModalType(null)
    setActiveItem(null)
  }

  const toggleActionCell = (itemId) => {
    setActiveActionCell((prev) => (prev === itemId ? null : itemId))
  }

  // Pagination helper function
  const pageNumbersToDisplay = (totalPages, currentPage) => {
    let pageNumbers = []
    const range = 2 // Show 2 pages before and after the current page
    let startPage = Math.max(1, currentPage - range)
    let endPage = Math.min(totalPages, currentPage + range)
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  // Retry functionality in case of an error
  const retryFetchData = useCallback(() => {
    if (fetchData) {
      fetchData()
    }
  }, [fetchData])

  return (
    <>
      {isLoading && <LoaderIcon />}
      {error && (
        <div>
          <p className={style.error}>
            {error.message || 'Failed to fetch data.'}
          </p>
          <button onClick={retryFetchData} className={style.retryButton}>
            Retry
          </button>
        </div>
      )}

      <table className={style.table}>
        <thead>
          <tr>
            {headers &&
              headers.map((header, index) => <th key={index}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => {
            const itemId = getId(item)
            return (
              <tr key={itemId}>
                {renderRow ? (
                  renderRow(item)
                ) : (
                  <td>{item.name}</td> // Default rendering if renderRow is not provided
                )}
                <td>
                  <div
                    ref={actionIconRef}
                    className={style.ActionCell}
                    onClick={() => toggleActionCell(itemId)}
                    aria-label="More actions"
                    role="button"
                    tabIndex="0"
                    onKeyDown={(e) =>
                      e.key === 'Enter' && toggleActionCell(itemId)
                    }
                  >
                    <MoreHorizontal size={24} color="currentColor" />
                    {activeActionCell === itemId && (
                      <ActionCell
                        item={item}
                        onView={openModal('view', item)}
                        onEdit={openModal('edit', item)}
                        onDelete={openModal('delete', item)}
                        onPrint={openModal('print', item)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Opex</td>
            <td>{''}</td>
            <td>{totalAmount}</td>
            <td>{totalPercentOpex}</td>
            <td>{totalMomChange}</td>
            <td>{''}</td>
          </tr>
        </tfoot>
      </table>

      <div className={style.pageIndex}>
        <p>
          Showing {indexOfFirstItem + 1} to{' '}
          {Math.min(indexOfLastItem, data.length)} of {data.length} entries
        </p>
        <div className={style.pagination}>
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={style.pageButton}
          >
            &lt;&lt; {/* First */}
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={style.pageNextButton}
          >
            &lt; {/* Previous */}
          </button>
          {pageNumbersToDisplay(totalPages, currentPage).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={currentPage === page ? style.activePageButton : ''}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={style.pageNextButton}
          >
            &gt; {/* Next */}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={style.pageButton}
          >
            &gt;&gt; {/* Last */}
          </button>
        </div>
      </div>

      {/* Modal Containers */}
      <ModalContainer
        onClose={closeModal}
        isOpen={modalType === 'opex-view'}
        content={
          <ViewOpexModal
            formData={activeItem}
            openEditModal={openModal('edit', activeItem)}
          />
        }
      />
      <ModalContainer
        onClose={closeModal}
        isOpen={modalType === 'capex-view'}
        content={
          <ViewCapexModal
            formData={activeItem}
            openEditModal={openModal('edit', activeItem)}
          />
        }
      />
      <ModalContainer
        onClose={closeModal}
        isOpen={modalType === 'opex-edit'}
        content={<EditOpexModal item={activeItem} />}
      />
      <ModalContainer
        onClose={closeModal}
        isOpen={modalType === 'capex-edit'}
        content={<EditCapexModal item={activeItem} />}
      />
      <ModalContainer
        onClose={closeModal}
        isOpen={modalType === 'delete'}
        content={<DeleteModal item={activeItem} />}
      />
    </>
  )
}

export default Table
