import React, { useState } from 'react'
import SelectOptions from '../../components/selectOptions/SelectOptions'
import AccountSummary from '../../components/accountSummary/AccountSummary'
import Button from '../../components/button/Button'

import style from './Account.module.css'
import boutiqueItems from './data'

function Account() {
  const [duration, setDuration] = useState('')
  const [selectedWears, setSelectedWears] = useState('')

  const category = boutiqueItems.map((item) => item.category)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const currentYear = new Date().getFullYear()

  const handleDuration = (e) => {
    const value = e.target.value
    setDuration(value)
  }

  const handleSelectWears = (e) => {
    const value = e.target.value
    setSelectedWears(value)
  }

  return (
    <div>
      <div>
        <h3>Accounts</h3>
      </div>
      <div>
        <div>
          <SelectOptions
            options={months}
            displayedRange="View Range"
            className={style.selectOptions}
            onChange={handleDuration}
            selectedOption={duration}
          />
          {duration ? (
            <p>
              {months[0]}
              <span>{currentYear}</span> to {duration}{' '}
              <span>{currentYear}</span>
            </p>
          ) : (
            <p>Select Duration</p>
          )}
        </div>
        <div>
          <SelectOptions
            selectedOption={selectedWears}
            onChange={handleSelectWears}
            displayedRange="Select Product"
            options={category}
            className={style.selectOptions}
          />
          {selectedWears ? <p>{selectedWears}</p> : <p>Select wears</p>}
        </div>
      </div>
      <div>
        <AccountSummary
          percentageIncrease="2%"
          summaryName="Total Sales"
          summaryValue="$4.12"
        />
        <AccountSummary
          percentageIncrease="1.4%"
          summaryName="Stock Value"
          summaryValue="$13.45"
        />
        <AccountSummary
          percentageIncrease="1.6%"
          summaryName="Sum Total"
          summaryValue="$7.00"
        />
      </div>
      <div>
        <p>Revenue Breakdown</p>
      </div>
      <div>
        <Button onClick={() => console.log('clicked')} buttonName="Export" />
      </div>
    </div>
  )
}

export default Account
