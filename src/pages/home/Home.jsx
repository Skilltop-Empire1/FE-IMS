import React from 'react'
import QtyCard from '../../components/quantityCard/qtyCard'
import style from './Home.module.css'
import Sales from '../../components/sales/Sales'
import TopItemCategories from '../../components/topItemCategory/TopItemCategories'
import StockStatus from '../../components/stockStatus/StockStatus'
import StoreList from '../../components/storeList/StoreList'
import Button from '../../components/button/Button'

function Home() {
  return (
    <div>
      <div className={style.header}>
        <h3>Recent Activities</h3>
      </div>

      <div className={style.cardsContainer}>
        <div className={style.cards}>
          <QtyCard cardName="Recent Products" quantity={740} />
        </div>
        <div className={style.cards}>
          <QtyCard cardName="Category" quantity={123} />
        </div>
        <div className={style.cards}>
          <QtyCard cardName="Store" quantity={4} />
        </div>
      </div>
      <div className={style.saleAndCatgoryContainer}>
        <Sales />
        <TopItemCategories />
      </div>
      <div className={style.stockStatusAndStoreList}>
        <StockStatus lowStockItems={12} lowStockCategories={6} />
        <StoreList />
      </div>
      <div className={style.btn}>
        <Button buttonName="Export" />
      </div>
    </div>
  )
}

export default Home
