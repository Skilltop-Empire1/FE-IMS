import React from 'react'
import style from './ExpenseButton.module.css'

function ExpenseButton({ name, handleClick }) {
  return (
    <button onClick={handleClick} className={style.btn}>
      {name}
    </button>
  )
}

export default ExpenseButton
