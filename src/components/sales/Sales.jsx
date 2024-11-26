import React from 'react'
import style from './Sales.module.css'
import { useNavigate } from 'react-router-dom'
import { useGetSalesRecordQuery } from '../../redux/APIs/salesRecordApi'

function Sales() {
  const navigate = useNavigate()
<<<<<<< HEAD
  const { data, isLoading, isError } = useGetSalesRecordQuery()

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading sales data!</div>

  // Ensure 'data' is an array
  const salesData = Array.isArray(data) ? data : []
=======
  const { data } = useGetSalesRecordQuery()
  const posPayments = data
    ?.data?.map((sale) => sale.paymentMethod === 'POS')
    .reduce((a, b) => a + b, 0)
  // console.log(posPayments)

  const cashPayments = data
    ?.data?.map((sale) => sale.paymentMethod === 'cash')
    .reduce((a, b) => a + b, 0)

  const transferPayments = data
    ?.data?.map((sale) => sale.paymentMethod === 'transfer')
    .reduce((a, b) => a + b, 0)
>>>>>>> development

  // Calculate payment method counts
  const posPayments = salesData.filter(
    (sale) => sale.paymentMethod === 'POS',
  ).length
  const cashPayments = salesData.filter(
    (sale) => sale.paymentMethod === 'cash',
  ).length
  const transferPayments = salesData.filter(
    (sale) => sale.paymentMethod === 'transfer',
  ).length

  // Calculate total payments
  const totalPayments = posPayments + transferPayments + cashPayments

  return (
    <div className={style.salesContainer}>
      <div onClick={() => navigate('/app/salesRecords')}>
        <p className={style.header}>Sales</p>
      </div>
      <ul>
        <li>
          <span>{posPayments}</span>
          <span>POS</span>
        </li>
        <li>
          <span>{transferPayments}</span>
          <span>Transfers</span>
        </li>
        <li>
          <span>{cashPayments}</span>
          <span>Cash</span>
        </li>
        <li>
          <span>{totalPayments}</span>
          <span>Total</span>
        </li>
      </ul>
    </div>
  )
}

export default Sales
