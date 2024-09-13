import React from 'react'
import style from './Main.module.css'

function Main({ children }) {
  return <div className={style.mainContainer}>{children}</div>
}

export default Main
