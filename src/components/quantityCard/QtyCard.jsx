import React from 'react'
import style from './qtyCard.module.css'

function QtyCard({ cardName, quantity }) {
  return (
    <div className={style.cardContainer}>
      <div>
        <h4>{quantity}</h4>
      </div>
      <div>
        <p className={style.qty}>Qty</p>
      </div>
      <div>
        <p className={style.cardName}>{cardName}</p>
      </div>
    </div>
  )
}

export default QtyCard
