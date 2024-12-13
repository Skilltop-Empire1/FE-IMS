import React from 'react'
import QtyCard from '../../components/quantityCard/QtyCard'
import style from './Home.module.css'
import Sales from '../../components/sales/Sales'
import TopItemCategories from '../../components/topItemCategory/TopItemCategories'
import StockStatus from '../../components/stockStatus/StockStatus'
import StoreList from '../../components/storeList/StoreList'
import Button from '../../components/Button/Button'
import {
  useGetStoresOverviewQuery,
  useGetStoresQuery,
} from '../../redux/APIs/storeApi'
import { useGetProductsQuery } from '../../redux/APIs/productApi'
import { Rings } from 'react-loader-spinner'
import { useGetCategoriesQuery } from '../../redux/categoryApi'
import { useGetStaffByIdQuery } from '../../redux/staffApi'
import { Printer } from 'lucide-react'

function Home() {
  const { data: storeData = [] } = useGetStoresQuery()
  const { data: productData = [], error, isLoading } = useGetProductsQuery()
  const { data: storeOverview = [] } = useGetStoresOverviewQuery()
  const { data: categoryData = [] } = useGetCategoriesQuery()

  const { id } = JSON.parse(localStorage.getItem('user'))
  // console.log('staff id', id)
  const {
    data: staff,
    error: staffError,
    isLoading: staffLoading,
  } = useGetStaffByIdQuery(id)
  // console.log('staff data', staff, 'error', staffError) // Log to see if there's any error
  const handlePrint = () => {
    window.print()
  }
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Rings color="#7D2CE0" />
      </div>
    )
  }

  if (error) {
    return <div>Error loading data</div>
  }

  const totalStores = storeData?.length || 0

  const sortedProducts = productData
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const totalRecentItems = sortedProducts.reduce(
    (total, product) => total + (product.quantity || 0),
    0,
  )

  const allCategories = categoryData?.categories?.length || 0

  const lowStocks = productData
    ?.filter((item) => item.alertStatus >= item.quantity)
    .reduce((acc, item) => acc + (item.quantity || 0), 0)

  const lowCategories = productData.filter(
    (item) => item.alertStatus >= item.quantity,
  ).length

  return (
    <div>
      <div className={style.header}>
        <h3>Recent Activities</h3>
      </div>

      <div className={style.cardsContainer}>
        <div className={style.cards}>
          <QtyCard
            page="products"
            cardName="All Products"
            quantity={totalRecentItems}
          />
        </div>
        <div className={style.cards}>
          <QtyCard
            page="categories"
            cardName="Category"
            quantity={allCategories}
          />
        </div>
        <div className={style.cards}>
          <QtyCard page="stores" cardName="Store" quantity={totalStores} />
        </div>
      </div>
      <div className={style.saleAndCatgoryContainer}>
        <Sales />
        <TopItemCategories />
      </div>
      <div className={style.stockStatusAndStoreList}>
        <StockStatus
          lowStockItems={lowStocks}
          lowStockCategories={lowCategories}
        />
        <StoreList data={storeOverview.data} />
      </div>

      <div className={style.btn}>
        <button onClick={handlePrint}>
          <Printer size={16} />
          <span>Print</span>
        </button>
      </div>
    </div>
  )
}

export default Home
