import React from 'react'
import QtyCard from '../../components/quantityCard/qtyCard'
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

function Home() {
  const { data: storeData = [] } = useGetStoresQuery()
  const { data: productData = [], error, isLoading } = useGetProductsQuery()
  const { data: storeOverview = [] } = useGetStoresOverviewQuery()

  console.log('storeData:', storeData)

  console.log('storeOverview:', storeOverview.data)

  const topCategoriesItems = [
    { quantitySold: 3 },
    { quantitySold: 3 },
    { quantitySold: 3 },
    { quantitySold: 3 },
    { quantitySold: 3 },
  ]

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

  const lowStocks = productData
    ?.filter((item) => item.alertStatus === 'low')
    .reduce((acc, item) => acc + (item.quantity || 0), 0)

  const lowCategories = productData.filter(
    (item) => item.alertStatus === 'low',
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
            cardName="Recent Items"
            quantity={totalRecentItems}
          />
        </div>
        <div className={style.cards}>
          <QtyCard page="categories" cardName="Category" quantity={123} />
        </div>
        <div className={style.cards}>
          <QtyCard page="stores" cardName="Store" quantity={totalStores} />
        </div>
      </div>
      <div className={style.saleAndCatgoryContainer}>
        <Sales />
        <TopItemCategories topCategoriesItems={topCategoriesItems} />
      </div>
      <div className={style.stockStatusAndStoreList}>
        <StockStatus
          lowStockItems={lowStocks}
          lowStockCategories={lowCategories}
        />
        <StoreList data={storeOverview.data} />
      </div>

      <div className={style.btn}>
        <Button buttonName="Export" />
      </div>
    </div>
  )
}

export default Home
