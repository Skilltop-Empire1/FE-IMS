import React from 'react'
import Notification from '../../assets/Notification'
import SettingSvg from '../../assets/SettingSvg'
import IconSvg from '../../assets/IconSvg'
import imsLogo from '../../assets/ims-logo.png' // Import the image

import style from './navBar.module.css'

function NavBar() {
  return (
    <nav className={style.navContainer}>
      <ul className={style.leftNavs}>
        <li>
          <img src={imsLogo} alt="Product Logo" />{' '}
          {/* Use the imported image variable */}
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
