import React, { useState, useEffect } from 'react'
import AccountSummary from '../../components/accountSummary/AccountSummary'
import Button from '../../components/Button/Button'
import style from './Account.module.css'
import { months } from './data'
import { useGetProductsQuery } from '../../redux/APIs/productApi'
import { useGetSalesRecordQuery } from '../../redux/APIs/salesRecordApi'
import { formatNaira } from '../../utils/nairaSign'

function Account() {
  const [startDuration, setStartDuration] = useState(months[0])
  const [endDuration, setEndDuration] = useState(months[11])
  const [selectedProducts, setSelectedProducts] = useState('')
  const [stockValue, setStockValue] = useState(0)
  const [totalSales, setTotalSales] = useState(0)

  const { data: productData = [], error, isLoading } = useGetProductsQuery()
  const { data: salesData = [] } = useGetSalesRecordQuery()

  const category = productData?.map((item) => item.name) || []
  const currentYear = new Date().getFullYear()

  const handleStartDuration = (e) => {
    const startMonth = e.target.value
    setStartDuration(startMonth)

    // If the selected start month is greater than the current end month, reset the end month
    if (months.indexOf(startMonth) > months.indexOf(endDuration)) {
      setEndDuration(startMonth)
    }
  }

  const handleEndDuration = (e) => {
    const endMonth = e.target.value
    // Only update end duration if it is greater than or equal to start duration
    if (months.indexOf(endMonth) >= months.indexOf(startDuration)) {
      setEndDuration(endMonth)
    }
  }

  const handleSelectProduct = (e) => {
    setSelectedProducts(e.target.value)
  }

  const getLastDateOfMonth = (month, year) => {
    return new Date(year, months.indexOf(month) + 1, 0)
  }

  useEffect(() => {
    if (selectedProducts) {
      const productDataItem = productData.find(
        (item) => item?.name === selectedProducts,
      )

      if (productDataItem) {
        const productPrice = productDataItem.price
        const productQuantity = productDataItem.quantity

        const endDate = getLastDateOfMonth(endDuration, currentYear)

        const salesForProduct = salesData.filter((sale) => {
          const soldDate = new Date(sale.soldDate)
          return sale.Product?.name === selectedProducts && soldDate <= endDate
        })

        const totalSalesAmount = salesForProduct.reduce(
          (total, sale) => total + sale.quantity * sale.Product.price,
          0,
        )

        setStockValue(productPrice * productQuantity)
        setTotalSales(totalSalesAmount)
      } else {
        setStockValue(0)
        setTotalSales(0)
      }
    } else {
      setStockValue(0)
      setTotalSales(0)
    }
  }, [startDuration, endDuration, selectedProducts, productData, salesData])

  const sumTotal = stockValue + totalSales

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
            <select onChange={handleStartDuration} value={startDuration}>
              <option value="">Start Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className={style.selectBox}>
            <select onChange={handleEndDuration} value={endDuration}>
              <option value="">End Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          {startDuration && endDuration ? (
            <p>
              {startDuration} <span>{currentYear}</span> to {endDuration}{' '}
              <span>{currentYear}</span>
            </p>
          ) : (
            <p>Select Duration</p>
          )}
        </div>
        <div className={style.selectOptions}>
          <div className={style.selectBox}>
            <select onChange={handleSelectProduct} value={selectedProducts}>
              <option value="">Select Product</option>
              {category.map((item) => (
                <option key={item} value={item}>
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
          percentageIncrease="1.4%"
          summaryName="Stock Value"
          summaryValue={formatNaira(stockValue.toFixed(2))}
          container={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
        <AccountSummary
          percentageIncrease="2%"
          summaryName="Total Sales"
          summaryValue={formatNaira(totalSales.toFixed(2))}
          container={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
        <AccountSummary
          percentageIncrease="1.6%"
          summaryName="Sum Total"
          summaryValue={formatNaira(sumTotal.toFixed(2))}
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
