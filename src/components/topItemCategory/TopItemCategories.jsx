import React from 'react'
import style from './TopItemCategories.module.css'
import { Link } from 'react-router-dom'
function TopItemCategories() {
  const topCategoriesItems = [
    { quantitySold: 3 },
    { quantitySold: 3 },
    { quantitySold: 3 },
    { quantitySold: 3 },
    { quantitySold: 3 },
  ]
  return (
    <div className={style.container}>
      <div className={style.header}>
        <p>Top Item Categories</p>
        <Link>
          <p>View All</p>
        </Link>
      </div>
      <div className={style.cardContainer}>
        {topCategoriesItems.map((item, index) => (
          <div key={index} className={style.topItemCategoryCard}>
            <p>{item.quantitySold}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopItemCategories
