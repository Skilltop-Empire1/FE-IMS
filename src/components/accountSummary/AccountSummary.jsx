import React from 'react'
import style from './AccountSummary.module.css'

function accountSummary({
  summaryName,
  summaryValue,
  percentageIncrease,
  container,
  valueStyle,
}) {
  return (
    <div className={container}>
      <strong>{summaryName}</strong>
      <div className={valueStyle}>
        <p>{summaryValue}</p>
        <span>{percentageIncrease}</span>
      </div>
    </div>
  )
}

export default accountSummary
