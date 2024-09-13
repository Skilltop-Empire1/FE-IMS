import React from 'react'
import style from './storeComponentStyle.module.css'

const StoreDetail = ({selectedStore}) => {
  return (
    <div className={`mt-5 ${style.box}`}>
      {selectedStore ? (
        <div>
            <h3>{selectedStore.location}</h3>
            <div className={style.moreInfo}>
                <p>Employee: {selectedStore.employees}</p>
                <p>Item: {selectedStore.items}</p>
                <p></p>
            </div>
        </div>
      ) : (<h3>No selected store</h3>)}
    </div>
  )
}

export default StoreDetail
