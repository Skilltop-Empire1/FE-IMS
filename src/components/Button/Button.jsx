import React from 'react'
import style from './Button.module.css'

const Button = ({ buttonName, className, onClick }) => {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className={`${style.buttonName} ${className}`}>
      <button onClick={onClick ? onClick : handlePrint} className={className}>{buttonName}</button>
    </div>
  )
}

export default Button
