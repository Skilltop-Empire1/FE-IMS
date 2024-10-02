import React from 'react'
import style from './Button.module.css'

const Button = ({ buttonName, className, onClick }) => {
  const handlePrint = () => {
    window.print()
    // console.log(buttonName)
  }

  return (
    <div className={`${style.buttonName} ${className}`}>
      <button onClick={onClick ? onClick : handlePrint}>{buttonName}</button>
    </div>
  )
}

export default Button
