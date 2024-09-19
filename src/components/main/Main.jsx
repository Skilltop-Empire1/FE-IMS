import React from 'react'
import style from './Main.module.css'

function Main({ children }) {
  // return <div className="flex-grow p-4 mt-20 ml-72">{children}</div>
  return <div className={style.mainContainer}>{children}</div>
}

export default Main
