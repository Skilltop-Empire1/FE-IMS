import React from 'react'
import style from './buttonStyles.module.css'

const Button = ({ buttonName, className, onClick }) => {
  return (
    <div className={`${style.buttonName} ${className}`}>
      <button onClick={onClick}>{buttonName}</button>
    </div>
  )
}

export default Button
