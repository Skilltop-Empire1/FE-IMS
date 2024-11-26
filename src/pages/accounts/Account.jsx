import React, { useState, useEffect } from 'react'
import AccountSummary from '../../components/accountSummary/AccountSummary'
import Button from '../../components/Button/Button'
import style from './Account.module.css'
import { months } from './data'
import { useGetProductsQuery } from '../../redux/APIs/productApi'
import { useGetSalesRecordQuery } from '../../redux/APIs/salesRecordApi'
import { formatNaira } from '../../utils/nairaSign'
import ExpenseButton from '../../components/expenseButton/ExpenseButton'
import usePrint from '../../utilities/usePrint'
import { useNavigate } from 'react-router-dom'

function Account() {
  const [startDuration, setStartDuration] = useState(months[0])
  const [endDuration, setEndDuration] = useState(months[11])
  const [selectedProducts, setSelectedProducts] = useState('')
  const [stockValue, setStockValue] = useState(0)
  const [totalSales, setTotalSales] = useState(0)

  const navigate = useNavigate()

  const { printRef, triggerPrint } = usePrint()

  const printPage = () => {
    triggerPrint()
    console.log('i got clicked')
  }

  const {
    data: productData = [],
    error: productError,
    isLoading: productLoading,
  } = useGetProductsQuery()
  const {
    data: salesData = [],
    error: salesError,
    isLoading: salesLoading,
  } = useGetSalesRecordQuery()

  const category = productData?.map((item) => item.name) || []
  const currentYear = new Date().getFullYear()

  const handleStartDuration = (e) => {
    const startMonth = e.target.value
    setStartDuration(startMonth)

    if (months.indexOf(startMonth) > months.indexOf(endDuration)) {
      setEndDuration(startMonth)
    }
  }

  const handleEndDuration = (e) => {
    const endMonth = e.target.value
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
          (total, sale) => total + sale.quantity * sale.productPrice,
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

  if (productLoading || salesLoading) {
    return <div>Loading data, please wait...</div>
  }

  // if (productError) {
  //   return <div>Error fetching product data: {productError.message}</div>
  // }

  // if (salesError) {
  //   return <div>Error fetching sales data: {salesError.message}</div>
  // }

  return (
    <div ref={printRef} className={style.container}>
      <div className={style.header}>
        <h3>Accounts</h3>
      </div>
      <div className={style.selectOptionsContainer}>
        <div className={style.durationContainer}>
          <div className={style.selectBox}>
            <p>Month A</p>
            <select onChange={handleStartDuration} value={startDuration}>
              <option value="">Start Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p>To</p>
          </div>
          <div className={style.selectBox}>
            <p>Month B</p>
            <select onChange={handleEndDuration} value={endDuration}>
              <option value="">End Month</option>
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        {startDuration && endDuration && (
          <p>
            {startDuration} <span>{currentYear}</span> to {endDuration}{' '}
            <span>{currentYear}</span>
          </p>
        )}

        <div className={style.selectOptions}>
          <div className={style.selectBox}>
            <p>Product Name</p>
            <select onChange={handleSelectProduct} value={selectedProducts} disabled>
              <option value="">Select Product</option>
              {category.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={style.accountSummary}>
        <AccountSummary
          percentageIncrease="1.4%"
          summaryName="Stock Value"
          summaryValue={formatNaira(stockValue.toFixed(2))}
          summaryStyle={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
        <AccountSummary
          percentageIncrease="2%"
          summaryName="Total Sales"
          summaryValue={formatNaira(totalSales.toFixed(2))}
          summaryStyle={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
        <AccountSummary
          percentageIncrease="1.6%"
          summaryName="Sum Total"
          summaryValue={formatNaira(sumTotal.toFixed(2))}
          summaryStyle={style.summaryContainer}
          valueStyle={style.valueStyle}
        />
      </div>
      <div className={style.expenditureContainer}>
        <div>
          <p>Expenditure Summary</p>
        </div>
        <div className={style.expenditures}>
          <ExpenseButton
            // handleClick={() => navigate('/app/accounts/opex')}
            name="OPEX"
          />
          <ExpenseButton
            handleClick={() => navigate('/app/accounts/capex')}
            name="CAPEX"
          />
        </div>
      </div>

      <div className={style.breakdown}>
        <p>Revenue Breakdown</p>
      </div>

      <div className={style.btn}>
        <Button onClick={printPage} buttonName="Export" />
      </div>
    </div>
  )
}

export default Account
