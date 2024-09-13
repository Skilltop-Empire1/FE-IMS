import React from 'react'
import style from './AccountSummary.module.css'

function accountSummary({ summaryName, summaryValue, percentageIncrease }) {
  return (
    <div className={style.container}>
      <p>{summaryName}</p> <p>{summaryValue}</p>
      <span>{percentageIncrease}</span>
    </div>
  )
}

export default accountSummary
