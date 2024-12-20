import React, { useState, useRef, useEffect } from 'react'
import style from './Table.module.css'
import { Eye, MoreHorizontal, Pen, Printer, Trash2 } from 'lucide-react'
import Loader from '../loaderElement/Loader'
import ModalContainer from '../../modals/ModalContainer'
import EditOpexModal from '../../modals/editModal/EditOpexModal'
import ViewOpexModal from '../../modals/viewModal/ViewOpexModal'
import DeleteModal from '../../modals/deleteModal/DeleteModal'

// Modal Types Constants
const MODAL_TYPES = {
  VIEW: 'opex-view',
  EDIT: 'opex-edit',
  DELETE: 'delete',
}

const ActionCell = React.forwardRef(
  ({ item, onView, onEdit, onDelete, onPrint }, ref) => (
    <ul ref={ref} className={style.buttonRow}>
      <li onClick={() => onView(item)}>
        <Eye size={16} style={{ marginRight: '8px' }} />
        <span>View</span>
      </li>
      <hr />
      <li onClick={() => onEdit(item)}>
        <Pen size={16} style={{ marginRight: '8px' }} />
        <span>Edit</span>
      </li>
      <hr />
      <li onClick={() => onPrint(item)}>
        <Printer size={16} style={{ marginRight: '8px' }} />
        <span>Print</span>
      </li>
      <hr />
      <li onClick={() => onDelete(item)}>
        <Trash2 size={16} style={{ marginRight: '8px', color: 'red' }} />
        <span>Delete</span>
      </li>
    </ul>
  ),
)

function Table({
  headers,
  data,
  itemsPerPage = 5,
  isLoading,
  renderRow,
  error,
  getId,
  handleEdit,
  handleView,
  handleDelete,
  totalAmount,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeActionCell, setActiveActionCell] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const actionDropDownRef = useRef(null)
  const actionIconRef = useRef(null)

  useEffect(() => {
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

    document.addEventListener('click', handleClickOutsideDropdown)
    return () => {
      document.removeEventListener('click', handleClickOutsideDropdown)
    }
  }, [])

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const toggleActionCell = (itemId) => {
    setActiveActionCell((prev) => (prev === itemId ? null : itemId))
  }

  return (
    <>
      {isLoading && <Loader />}
      {error && (
        <p className={style.error}>
          {error.message || 'Failed to fetch data.'}
        </p>
      )}
      <div className={style.tableContainer}>
        <table className={style.table}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              currentItems.map((item) => {
                const itemId = getId(item)
                return (
                  <tr key={itemId}>
                    {renderRow ? (
                      renderRow(item, {
                        handleView,
                        handleEdit,
                        handleDelete,
                      })
                    ) : (
                      <>
                        <td>{item.name}</td>
                        <td>{item.hod}</td>
                        <td>{item.noOfStaff}</td>
                        <td>{item.location}</td>
                        <td>{item.bedCapacity}</td>
                        <td>{item.specialty}</td>
                        <td>{item.equipment.join(', ')}</td>
                      </>
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
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onPrint={() =>
                              console.log('Print action for id:', itemId)
                            }
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
      <div className={style.totalAmount}>
        <p>Total CAPEX</p>
        <p>{totalAmount}</p>
      </div>
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
            &lt;&lt;
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={style.pageNextButton}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={
                currentPage === index + 1 ? style.activePageButton : ''
              }
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={style.pageNextButton}
          >
            &gt;
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={style.pageButton}
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      <ModalContainer
        isOpen={modalType === MODAL_TYPES.EDIT}
        onClose={() => setModalType(null)}
        content={<EditOpexModal item={activeItem} />}
      />
      <ModalContainer
        isOpen={modalType === MODAL_TYPES.VIEW}
        onClose={() => setModalType(null)}
        content={<ViewOpexModal formData={activeItem} />}
      />
      <ModalContainer
        isOpen={modalType === MODAL_TYPES.DELETE}
        onClose={() => setModalType(null)}
        content={<DeleteModal item={activeItem} />}
      />
    </>
  )
}

export default Table
