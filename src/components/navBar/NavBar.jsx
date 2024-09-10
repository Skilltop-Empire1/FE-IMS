import React from 'react'
import Notification from '../../assets/Notification'
import SettingSvg from '../../assets/SettingSvg'
import IconSvg from '../../assets/IconSvg'

import style from './navBar.module.css'

function NavBar() {
  return (
    <nav className={style.navContainer}>
      <ul className={style.leftNavs}>
        <li>
          <img src="" alt="product-name" />
        </li>
        <li>
          <input type="text" placeholder="Search" />
        </li>
      </ul>
      <ul className={style.rightNavs}>
        <li>
          <Notification />
        </li>
        <li>
          <SettingSvg />
        </li>
        <li>
          <IconSvg />
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
