import React, { useState } from 'react'
import AccountSummary from '../../components/accountSummary/AccountSummary'
import Button from '../../components/button/Button'
import style from './Account.module.css'
import { months } from './data'
import { useGetProductsQuery } from '../../redux/APIs/productApi'

function Account() {
  const [duration, setDuration] = useState('')
  const [selectedProducts, setSelectedProducts] = useState('')
  const [stockValue, setStockValue] = useState(0)
  const [totalSales, setTotalSales] = useState(5)

  const { data: productData = [], error, isLoading } = useGetProductsQuery()

  const category = productData?.map((item) => item.name) || []

  const currentYear = new Date().getFullYear()

  // Handles duration selection (e.g., month or view range)
  const handleDuration = (e) => {
    setDuration(e.target.value)
  }

  // Handles product selection and computes the stock value for the selected product
  const handleSelectWears = (e) => {
    const productName = e.target.value
    setSelectedProducts(productName)

    const product = productData.find((item) => item.name === productName)

    if (product) {
      const { price, quantity } = product
      setStockValue(price * quantity)
    } else {
      setStockValue(0)
    }
  }

  const sumTotal = stockValue - totalSales

  // Handle when data is still loading or an error occurs
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error fetching product data</div>
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h3>Accounts</h3>
      </div>
      <div className={style.selectOptionsContainer}>
        <div className={style.selectOptions}>
          {/* Select Duration */}
          <div className={style.selectBox}>
            <select onChange={handleDuration} value={duration || ''}>
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

        {/* Select Product */}
        <div className={style.selectOptions}>
          <div className={style.selectBox}>
            <select onChange={handleSelectWears} value={selectedProducts || ''}>
              <option value="">Select Product</option>
              {category.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {selectedProducts ? (
            <p>{selectedProducts}</p>
          ) : (
            <p>Select a product to view stock</p>
          )}
        </div>
      </div>

      {/* Account Summaries */}
      <div className={style.accountSummary}>
        <AccountSummary
          percentageIncrease="2%"
          summaryName="Total Sales"
          summaryValue={`$${totalSales.toFixed(2)}`}
          container={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
        <AccountSummary
          percentageIncrease="1.4%"
          summaryName="Stock Value"
          summaryValue={`$${stockValue.toFixed(2)}`}
          container={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
        <AccountSummary
          percentageIncrease="1.6%"
          summaryName="Sum Total"
          summaryValue={`$${sumTotal.toFixed(2)}`}
          container={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
      </div>

      {/* Revenue Breakdown */}
      <div className={style.breakdown}>
        <p>Revenue Breakdown</p>
      </div>

      {/* Export Button */}
      <div className={style.btn}>
        <Button
          onClick={() => console.log('Export clicked')}
          buttonName="Export"
        />
      </div>
    </div>
  )
}

export default Account
