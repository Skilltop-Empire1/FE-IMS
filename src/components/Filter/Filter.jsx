import React from 'react'
import style from './filterstyle.module.css'
import RedirectButton from '../Button/RedirectButton'

const Filter = ({handleFilter, handleSearch, direction, title, button}) => {
  return (
    <div className={`flex justify-between items-center px-4 ${style.body}`}>
      <div className={style.left}>
        <h2>{title}</h2>
      </div>
      <div className={`flex ${style.right}`}>
        <input
            type="text"
            placeholder="Search items"
            onChange={(e) => handleSearch(e.target.value)}
        />
        
        {/* Select Filter */}
        <select onChange={(e) => handleFilter(e.target.value)}>
            <option value="all">Filter by</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="dairy">Dairy</option>
            
        </select>
        <RedirectButton buttonName={button} direction=  {direction} />

      </div>
    </div>
  )
}

export default Filter
