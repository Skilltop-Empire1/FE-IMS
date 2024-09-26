import React, { Children, useEffect, useRef } from 'react'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Main from '../main/Main'

import style from './AppLayout.module.css'
import { useRedirectOnMobile } from '../../utilities/mobileRedirect'
import { useDispatch, useSelector } from 'react-redux'
import { hideDropdown } from '../../redux/slices/dropdownSlice'

function AppLayout() {
  // useRedirectOnMobile() //commented out for backwards compatibility during development
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
        <div className="navbar">
          <NavBar dropdownRef={dropdownRef} />
        </div>
        <div className={style.main}>
          <div className="side-nav">
            <SideBar />
          </div>

          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
      {/* </div> */}
    </>
  )
}

export default AppLayout
