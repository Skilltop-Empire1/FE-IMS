import React from 'react'
import style from './storeComponentStyle.module.css'

const StoreDetail = ({selectedStore}) => {
  return (
    <div className={`mt-11 ${style.box}`}>
      {selectedStore ? (
        <div>
            <h3>{selectedStore.location}</h3>
            <div className={style.moreInfo}>
                <p>Name: {selectedStore.storeName}</p>
                <p>Employee: {selectedStore.noOfStaff}</p>
                <p>Manager: {selectedStore.storeManager}</p>
                <p>Contact: {selectedStore.storeContact}</p>
                <p></p>
            </div>
        </div>
      ) : (<h3>No selected store</h3>)}
    </div>
  )
}

export default StoreDetail
