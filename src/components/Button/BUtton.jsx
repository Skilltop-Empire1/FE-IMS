import React from 'react'
import style from './buttonStyles.module.css'

const BUtton = ({title, direction}) => {
  return (
    <div className={style.body}>
      <a href={direction}><button>{title}</button></a>
    </div>
  )
}

export default BUtton
