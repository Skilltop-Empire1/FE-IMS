import React, { useState } from 'react'
import AccountSummary from '../../components/accountSummary/AccountSummary'
import Button from '../../components/button/Button'

import style from './Account.module.css'
import boutiqueItems, { months } from './data'

function Account() {
  const [duration, setDuration] = useState('')
  const [selectedWears, setSelectedWears] = useState('')

  const category = boutiqueItems.map((item) => item.category)

  const currentYear = new Date().getFullYear()

  const handleDuration = (e) => {
    setDuration(e.target.value)
  }

  const handleSelectWears = (e) => {
    setSelectedWears(e.target.value)
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h3>Accounts</h3>
      </div>
      <div className={style.selectOptionsContainer}>
        <div className={style.selectOptions}>
          <div className={style.selectBox}>
            <select onChange={handleDuration} value={duration}>
              <option value="">View Range</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {duration ? (
            <p>
              {months[0]} <span>{currentYear}</span> to {duration}{' '}
              <span>{currentYear}</span>
            </p>
          ) : (
            <p>Select Duration</p>
          )}
        </div>
        <div className={style.selectOptions}>
          <div className={style.selectBox}>
            <select onChange={handleSelectWears} value={selectedWears}>
              <option value="">Select Product</option>
              {category.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {selectedWears ? <p>{selectedWears}</p> : <p>Select wears</p>}
        </div>
      </div>
      <div className={style.accountSummary}>
        <AccountSummary
          percentageIncrease="2%"
          summaryName="Total Sales"
          summaryValue="$4.12"
          container={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
        <AccountSummary
          percentageIncrease="1.4%"
          summaryName="Stock Value"
          summaryValue="$13.45"
          container={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
        <AccountSummary
          percentageIncrease="1.6%"
          summaryName="Sum Total"
          summaryValue="$7.00"
          container={style.summaryContainer}
          valueStyle={style.valueStyle}
          s
        />
      </div>
      <div className={style.breakdown}>
        <p>Revenue Breakdown</p>
      </div>
      <div className={style.btn}>
        <Button onClick={() => console.log('clicked')} buttonName="Export" />
      </div>
    </div>
  )
}

export default Account
