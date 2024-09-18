import React from 'react'
import style from './Sales.module.css'
import { useNavigate } from 'react-router-dom'

function Sales({ posPayments, transferPayments, cashPayments, totalPayments }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate('/app/salesRecords')}
      className={style.salesContainer}
    >
      <div>
        <p className={style.header}>Sales</p>
      </div>
      <ul>
        <li>
          <span>POS</span>
          {posPayments}
          <span></span>
        </li>
        <li>
          <span>Transfers</span>
          {transferPayments}
          <span></span>
        </li>
        <li>
          <span>Cash</span>
          {cashPayments}
          <span></span>
        </li>
        <li>
          <span>Total</span>
          {totalPayments}
          <span></span>
        </li>
      </ul>
    </div>
  )
}

export default Sales
