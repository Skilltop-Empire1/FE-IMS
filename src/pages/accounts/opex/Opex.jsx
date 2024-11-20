import React, { useEffect, useState } from 'react'
import Table from '../../../components/expenseTable/Table'
import style from './Opex.module.css'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useGetOpexQuery } from '../../../redux/APIs/accountApi'

function Opex() {
  const { data: opexData, isLoading, isError } = useGetOpexQuery()
  const navigate = useNavigate()

  // Initialize headers and state
  const headers = [
    'OPEX Category',
    'Expense Description',
    'Amount',
    '% of Total OPEX',
    'Month-over-Month Change',
    'Action',
  ]

  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Handle search term change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Filter data based on search term
  const filterData = (data, searchTerm) => {
    return data.filter(
      (item) =>
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Calculate total OPEX amount and update the data with percentage and MOM change
  const calculatePercentagesAndMOM = (opexData) => {
    const totalAmount = opexData.reduce((total, item) => total + item.amount, 0)

    return opexData.map((item) => {
      const percentage =
        totalAmount > 0 ? ((item.amount / totalAmount) * 100).toFixed(2) : 0
      const momChange = 'N/A' // Placeholder for MOM change (could be implemented with actual data)
      return { ...item, percentage: `${percentage}%`, momChange }
    })
  }

  // Only update state when opexData is valid and calculate total OPEX data
  useEffect(() => {
    if (opexData && Array.isArray(opexData)) {
      const processedData = calculatePercentagesAndMOM(opexData)
      setData(processedData)
    }
  }, [opexData])

  // Filter data on search term change
  useEffect(() => {
    const filteredData = filterData(data, searchTerm)
    setData(filteredData)
  }, [searchTerm, data])

  // Render each row of the table
  const renderRow = (item) => (
    <tr key={item.expendId}>
      <td>{item.category}</td>
      <td>{item.description}</td>
      <td>{item.amount}</td>
      <td>{item.percentage}</td>
      <td>{item.momChange}</td>
      <td>
        <button
          onClick={() =>
            navigate(`/app/accounts/opex/edit-opex/${item.expendId}`)
          }
        >
          Edit
        </button>
      </td>
    </tr>
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading data</div>
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
          totalAmount={data.reduce((sum, item) => sum + item.amount, 0)}
          totalPercentOpex={data.reduce(
            (sum, item) => sum + parseFloat(item.percentage.replace('%', '')),
            0,
          )}
          totalMomChange={data.reduce(
            (sum, item) =>
              sum + (item.momChange === 'N/A' ? 0 : item.momChange),
            0,
          )}
        />
      </div>
    </div>
  )
}

export default Opex
