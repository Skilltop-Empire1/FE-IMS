import React from 'react'
import Filter from '../../components/Filter/Filter'
import Button from '../../components/Button/Button'

function SalesRecord() {
  return (
    <div>
      <div>
        <h3>Sales Record</h3>
        {/* <Filter /> */}
        <Button buttonName="+ Add Sales" />
      </div>
      <div></div>
    </div>
  )
}

export default SalesRecord
