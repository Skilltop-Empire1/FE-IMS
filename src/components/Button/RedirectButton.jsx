import React from 'react'
import style from './Button.module.css'
import { Link } from 'react-router-dom'

function RedirectButton({ buttonName, onClick, className = '', direction }) {
  const btnClassName = `${style.buttonName} ${className}`
  return (
    <Link to={direction}>
      <button className={btnClassName} onClick={onClick}>
        {buttonName}
      </button>
    </Link>
  )
}

export default RedirectButton
