import React, { useState, useEffect } from 'react'
import Table from '../../../components/expenseTable/Table'
import style from './Capex.module.css'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Capex() {
  // Dummy Capex data
  const dummyCapexData = [
    {
      id: 1,
      category: 'Machine Purchase',
      description: 'New manufacturing machine',
      amount: 20000,
      percentage: '50%',
      acquisitionDate: '2024-01-01',
      lifeSpan: '10 years',
      depreciationRate: '10%',
    },
    {
      id: 2,
      category: 'Building Renovation',
      description: 'Office building renovation',
      amount: 50000,
      percentage: '50%',
      acquisitionDate: '2023-12-01',
      lifeSpan: '15 years',
      depreciationRate: '5%',
    },
    {
      id: 3,
      category: 'Vehicle Purchase',
      description: 'Company car fleet expansion',
      amount: 30000,
      percentage: '30%',
      acquisitionDate: '2023-08-15',
      lifeSpan: '5 years',
      depreciationRate: '20%',
    },
    {
      id: 4,
      category: 'IT Equipment',
      description: 'New servers and computers',
      amount: 15000,
      percentage: '20%',
      acquisitionDate: '2024-02-20',
      lifeSpan: '7 years',
      depreciationRate: '15%',
    },
  ]

  // Initialize the state for Capex data
  const [data, setData] = useState(dummyCapexData)

  const navigate = useNavigate()

  // Define the headers for the Capex table
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

  const renderRow = (item) => (
    <>
      <td>{item.category}</td> {/* CAPEX Category */}
      <td>{item.description}</td> {/* Item/Asset Description */}
      <td>{item.amount}</td> {/* Amount */}
      <td>{item.percentage}</td> {/* % of Total Capex */}
      <td>{item.acquisitionDate}</td> {/* Acquisition Date */}
      <td>{item.lifeSpan}</td> {/* Expected Life Span */}
      <td>{item.depreciationRate}</td> {/* Depreciation Rate */}
      <td>{item.action}</td> {/* Action */}
    </>
  )

  const getId = (item) => item.id // Ensure each row has a unique identifier

  return (
    <div className={style.container}>
      <div>
        <div className={style.titleContainer}>
          <h3>Capex Expense Record</h3>
          <div className={style.searchContainer}>
            <div className={style.searchBar}>
              <Search color="#6D6D6D" size="24px" />
              <input type="text" placeholder="Search by asset name" />
            </div>
            <button onClick={() => navigate('/app/accounts/capex/add-capex')}>
              + Add Capex
            </button>
          </div>
        </div>
      </div>

      <div>
        <Table
          renderRow={renderRow}
          headers={headers}
          data={data} // Pass the dummy data to the Table component
          getId={getId}
          modalTypePrefix="capex"
        />
      </div>
    </div>
  )
}

export default Capex
