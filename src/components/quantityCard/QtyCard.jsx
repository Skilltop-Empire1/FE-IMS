import React from 'react'
import style from './qtyCard.module.css'
import { useNavigate } from 'react-router-dom'

function QtyCard({ cardName, quantity, page }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/app/${page}`)}
      className={style.cardContainer}
    >
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
