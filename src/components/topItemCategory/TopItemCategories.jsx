import React from 'react'
import style from './TopItemCategories.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useGetSoldProductsQuery } from '../../redux/APIs/productApi'
function TopItemCategories() {
  const { data: soldProductData } = useGetSoldProductsQuery()
  console.log(typeof data)

  const topCategoriesItems = Array.isArray(soldProductData)
    ? soldProductData
        .slice()
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 4)
    : []

  console.log('topCategoriesItems', topCategoriesItems)

  const navigate = useNavigate()

  return (
    <div onClick={() => navigate('/app/products')} className={style.container}>
      <div className={style.header}>
        <p>Top Item Categories</p>
        <Link to="/app/salesRecords">
          <p>View All</p>
        </Link>
      </div>
      <div className={style.cardContainer}>
        {topCategoriesItems.map((item, index) => (
          <div key={index} className={style.topItemCategoryCard}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopItemCategories
