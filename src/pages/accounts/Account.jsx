import React, { useState } from 'react'
import AccountSummary from '../../components/accountSummary/AccountSummary'
import Button from '../../components/Button/Button'
import style from './Account.module.css'
import { months } from './data'
import { useGetProductsQuery } from '../../redux/APIs/productApi'
import { useGetSalesRecordQuery } from '../../redux/APIs/salesRecordApi'

function Account() {
  const [duration, setDuration] = useState('')
  const [selectedProducts, setSelectedProducts] = useState('')
  const [stockValue, setStockValue] = useState(0)
  const [totalSales, setTotalSales] = useState(0)

  const { data: productData = [], error, isLoading } = useGetProductsQuery()
  const { data: salesData = [] } = useGetSalesRecordQuery()

  console.log('productData', salesData)

  const category = productData?.map((item) => item.name) || []
  const currentYear = new Date().getFullYear()

  const handleDuration = (e) => {
    setDuration(e.target.value)
  }

  const handleSelectWears = (e) => {
    const productName = e.target.value
    setSelectedProducts(productName)

    const productDataItem = productData.find(
      (item) => item.name === productName,
    )

    if (productDataItem) {
      const productPrice = productDataItem.price
      const productQuantity = productDataItem.quantity

      const currentDate = new Date()
      const startDate = new Date(
        `${currentYear}-${months.indexOf(duration) + 1}-01`,
      )
      const endDate = new Date(currentYear, months.indexOf(duration) + 1, 0)

      const salesForProduct = salesData.filter((sale) => {
        const saleDate = new Date(sale.soldDate)
        return (
          sale.Product.name === productName &&
          saleDate >= startDate &&
          saleDate <= endDate
        )
      })

      const totalSalesAmount = salesForProduct.reduce((total, sale) => {
        return total + sale.quantity * sale.Product.price
      }, 0)

      setStockValue(productPrice * productQuantity)
      setTotalSales(totalSalesAmount)
    } else {
      setStockValue(0)
      setTotalSales(0)
    }
  }

  const sumTotal = stockValue - totalSales

  if (isLoading) {
    return <div>Loading data, please wait...</div>
  }

  if (error) {
    return <div>Error fetching product data: {error.message}</div>
  }

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h3>Accounts</h3>
      </div>
      <div className={style.selectOptionsContainer}>
        <div className={style.selectOptions}>
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

      <div className={style.breakdown}>
        <p>Revenue Breakdown</p>
      </div>

      <div className={style.btn}>
        <Button buttonName="Export" />
      </div>
    </div>
  )
}

export default Account
