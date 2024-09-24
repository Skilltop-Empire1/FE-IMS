import React from 'react'
import style from './Button.module.css'

function RedirectButton({ buttonName, onClick, className = '', direction }) {
  const btnClassName = `${style.buttonName} ${className}`
  return (
    <a href={direction}>
      <button className={btnClassName} onClick={onClick}>
        {buttonName}
      </button>
    </a>
  )
}

export default RedirectButton
