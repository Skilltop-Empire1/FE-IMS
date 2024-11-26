import React, { useEffect, useState } from 'react'
import Table from '../../../components/expenseTable/Table'
import style from './Opex.module.css'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetOpexQuery } from '../../../redux/APIs/accountApi'
import ViewOpexModal from '../../../modals/viewModal/ViewOpexModal'
import { useModal } from '../../../context/ModalContext'
import EditOpexModal from '../../../modals/editModal/EditOpexModal'
import DeleteModal from '../../../modals/deleteModal/DeleteModal'
import ModalContainer from '../../../modals/ModalContainer'

function Opex() {
  const { data: opexData = [], isLoading, isError } = useGetOpexQuery()
  const navigate = useNavigate()

  const [modalType, setModalType] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [modalProps, setModalProps] = useState({})

  const openModal =
    (type, props = {}) =>
    () => {
      setModalType(type)
      setModalProps(props)
      console.log('modal props ', props)
    }

  const closeModal = () => {
    setModalType(null)
    setActiveItem(null)
  }

  const headers = [
    'OPEX Category',
    'Expense Description',
    'Amount',
    '% of Total OPEX',
    'Month-over-Month Change',
    'Action',
  ]

  // const handleView = (item) => {
  //   openModal(<ViewOpexModal />, item)
  //   console.log('ciew click detected', item)
  //   // setActiveActionCell(null)
  // }

  const renderRow = (item) => (
    <tr key={item.expendId}>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.amount}</td>
      <td>{item.percentage}</td>
      <td>{item.momChange}</td>
    </tr>
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  // if (isError) {
  //   return <div>Error loading data</div>
  // }

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
                placeholder="Search by category or description"
                // value={searchTerm}
                // onChange={handleSearchChange}
              />
            </div>
            <button onClick={() => navigate('/app/accounts/opex/add-opex')}>
              + Add Expense
            </button>
          </div>
        </div>
      </div>

      <div>
        <Table
          renderRow={renderRow}
          getId={(item) => item.expendId}
          data={opexData}
          headers={headers}
          handleEdit={openModal('opex-edit', 'item')}
          handleDelete={openModal('opex-delete')}
          handleView={(item) => void openModal('opex-view', item)}
        />
      </div>
      <ModalContainer
        isOpen={modalType === 'opex-edit'}
        onClose={closeModal}
        content={<EditOpexModal />}
      />
      <ModalContainer
        isOpen={modalType === 'opex-view'}
        onClose={closeModal}
        content={<ViewOpexModal formData={modalProps} />}
      />
      <ModalContainer
        isOpen={modalType === 'delete'}
        onClose={closeModal}
        content={<DeleteModal />}
      />
    </div>
  )
}

export default Opex
