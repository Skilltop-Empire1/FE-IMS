import React, { useState, useEffect } from 'react'
import Table from '../../../components/expenseTable/Table'
import style from './Opex.module.css'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ModalContainer from '../../../modals/ModalContainer'
import { useGetOpexQuery } from '../../../redux/APIs/accountApi'

function Opex() {
  const { data: opexData, isLoading, isError } = useGetOpexQuery()

  console.log('Opex', opexData) // Log the data to check

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data</div>
  }

  const navigate = useNavigate()

  const headers = [
    'OPEX Category',
    'Expense Description',
    'Amount',
    '% of Total OPEX',
    'Month-over-Month Change',
    'Action',
  ]

  const fallbackData = [
    {
      id: 1,
      category: 'Rent',
      description: 'Office rent',
      amount: 1000,
      percentage: '10%',
      momChange: '5%',
    },
    {
      id: 2,
      category: 'Salaries',
      description: 'Employee salaries',
      amount: 5000,
      percentage: '50%',
      momChange: '-2%',
    },
  ]

  const [data, setData] = useState(fallbackData)
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const filterData = (data, searchTerm) => {
    return data.filter(
      (item) =>
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  useEffect(() => {
    if (opexData) {
      setData(opexData)
    } else {
      setData(fallbackData)
    }
  }, [opexData])

  useEffect(() => {
    const filteredData = filterData(opexData || fallbackData, searchTerm)
    setData(filteredData)
  }, [searchTerm, opexData])

  const renderRow = (item) => (
    <>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.amount}</td>
      <td>{item.percentage}</td>
      <td>{item.momChange}</td>
      <td>{item.action}</td>
    </>
  )

  const getId = (item) => item.id

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
                value={searchTerm}
                onChange={handleSearchChange}
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
          headers={headers}
          data={data}
          getId={getId}
        />
      </div>
    </div>
  )
}

export default Opex
