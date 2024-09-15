import React from 'react'
import style from './Button.module.css'

function Button({ buttonName, onClick, className = '' }) {
  const btnClassName = `${style.buttonName} ${className}`
  return (
      <button className={btnClassName} onClick={onClick}>
        {buttonName}
      </button>
  )
}

export default Button
