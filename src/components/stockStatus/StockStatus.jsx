import React from 'react'
import style from './StockStatus.module.css'
import { useNavigate } from 'react-router-dom'

function StockStatus({ lowStockItems, lowStockCategories }) {
  const navigate = useNavigate()
  return (
    <div className={style.container}>
      <div onClick={() => navigate('/app/products')}>
        <h3 className='hover:text-purple-800'>Stock Alert Status</h3>
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
