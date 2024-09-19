import React from 'react'
import style from './StoreList.module.css'
import { Link } from 'react-router-dom'

function StoreList({ data }) {
  const limitedData = Array.isArray(data) ? data.slice(0, 4) : []

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h3>Store List</h3>
        <Link to="/app/stores">
          <p>View All</p>
        </Link>
      </div>
      <table>
        <tbody className={style.headlessTable}>
          {limitedData.length > 0 ? (
            limitedData.map((row) => (
              <tr key={row.storeId || row.storeName}>
                <td>{row.storeName || 'N/A'}</td>
                <td>{row.noOfStaff ? `${row.noOfStaff} employees` : 'N/A'}</td>
                <td>{row.totalItems || 'N/A'}</td>
                <td>{row.totalStockValue || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No stores available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default StoreList
