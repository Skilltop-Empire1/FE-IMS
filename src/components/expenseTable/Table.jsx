import React, { useEffect, useRef, useState } from 'react'
import style from './Table.module.css'
import { MoreHorizontal } from 'lucide-react'
import Loader from '../loaderElement/Loader'
import { useModal } from '../../context/ModalContext'

const ActionCell = React.forwardRef(
  ({ item, onView, onEdit, onDelete, onPrint }, ref) => (
    <ul ref={ref} className={style.buttonRow}>
      <li onClick={() => onView(item)}>View</li>
      <hr />
      <li onClick={() => onEdit(item)}>Edit</li>
      <hr />
      <li onClick={() => onPrint(item)}>Print</li>
      <hr />
      <li onClick={() => onDelete(item)}>Delete</li>
    </ul>
  ),
)

function Table({
  headers,
  data,
  itemsPerPage = 5,
  handleView,
  handleEdit,
  handleDelete,
  handlePrint,
  isLoading,
  renderRow,
  error,
  getId,
}) {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeActionCell, setActiveActionCell] = useState(null)
  const { openModal, closeModal } = useModal()
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

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  // const handleEdit = (item) => {
  //   openModal(editModal, item)
  //   setActiveActionCell(null)
  // }
  // const handleView = (item) => {
  //   openModal(viewModal, item)
  //   console.log('ciew click detected', item)
  //   setActiveActionCell(null)
  // }
  // const handleDelete = (item) => {
  //   openModal(deleteModal, item)
  //   setActiveActionCell(null)
  // }
  // const handlePrint = (id) => {
  //   console.log('Print action for id:', id)
  //   setActiveActionCell(null)
  // }

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
                      handlePrint,
                      setActiveActionCell,
                      activeActionCell,
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
                          onPrint={handlePrint}
                          // ref={actionDropDownRef}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
        </tbody>
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
    </>
  )
}

export default Table
