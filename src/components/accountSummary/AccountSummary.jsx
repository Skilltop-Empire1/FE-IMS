import React from 'react'
import style from './AccountSummary.module.css'

function accountSummary({
  summaryName,
  summaryValue,
  percentageIncrease,
  summaryStyle,
  valueStyle,
}) {
  return (
    <div className={summaryStyle}>
      <p>{summaryName}</p>
      <div className={valueStyle}>
        <p>{summaryValue}</p>
        <span>{percentageIncrease}</span>
      </div>
    </div>
  )
}

export default accountSummary
