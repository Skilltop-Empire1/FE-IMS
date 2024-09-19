import React from 'react'
import style from './StockStatus.module.css'

function StockStatus({ lowStockItems, lowStockCategories }) {
  return (
    <div className={style.container}>
      <div>
        <h3>Stock Alert Status</h3>
      </div>
      <div className={style.contentStatus}>
        <div>
          <p>Low Stock Items</p>
          <span>{lowStockItems}</span>
        </div>

        <div>
          <p>Item Categories</p>
          <span>{lowStockCategories}</span>
        </div>
      </div>
    </div>
  )
}

export default StockStatus
