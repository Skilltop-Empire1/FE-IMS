import React, { Children, useEffect, useRef, useState } from 'react'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Main from '../main/Main'

import style from './AppLayout.module.css'
import { useRedirectOnMobile } from '../../utilities/mobileRedirect'
import { useDispatch, useSelector } from 'react-redux'
import { hideDropdown } from '../../redux/slices/dropdownSlice'

function AppLayout() {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const toggleMenu = () => {
    console.log('toggleMenu active', isShowMenu)
    setIsShowMenu(!isShowMenu)
  }
  const closeMenu = () => {
    setIsShowMenu(false)
  }

  const dispatch = useDispatch()
  const dropdownRef = useRef(null)
  useEffect(() => {
    const handleClickOutsideDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        dispatch(hideDropdown())
      }
    }
    document.addEventListener('mousedown', handleClickOutsideDropdown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideDropdown)
    }
  }, [dispatch])

  return (
    <>
      <div className={style.appContainer}>
        <div className={style.navbar}>
          <NavBar dropdownRef={dropdownRef} />
        </div>
        <div className={style.main}>
          <div className={`${style.sideNav} ${isShowMenu ? style.show : ''}`}>
            <SideBar closeMenu={closeMenu} />
          </div>
          <Main toggleMenu={toggleMenu}>
            <Outlet />
          </Main>
        </div>
      </div>
    </>
  )
}

export default AppLayout
