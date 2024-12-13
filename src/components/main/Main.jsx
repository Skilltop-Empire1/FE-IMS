import React, { useState } from 'react'
import style from './Main.module.css'
import { Menu } from 'lucide-react'

function Main({ children, toggleMenu }) {
  return (
    <div className={style.mainContainer}>
      {' '}
      <button
        className={style.hamburger}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Menu size={32} />
      </button>
      {children}
    </div>
  )
}

export default Main
