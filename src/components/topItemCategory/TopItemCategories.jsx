import React from 'react'
import style from './TopItemCategories.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useGetSalesRecordQuery } from '../../redux/APIs/salesRecordApi'
function TopItemCategories() {
  const { data: soldProductData } = useGetSalesRecordQuery()

  const topCategoriesItems = Array.isArray(soldProductData)
    ? soldProductData
        .slice()
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 6)
    : []

  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate('/app/salesRecords')}
      className={style.container}
    >
      <div className={style.header}>
        <p>Most Sold Products</p>
        <Link to="/app/salesRecords">
          <p>View All</p>
        </Link>
      </div>
      <div className={style.cardContainer}>
        {topCategoriesItems.map((item, index) => (
          <div key={index} className={style.topItemCategoryCard}>
            <p>{item.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopItemCategories
