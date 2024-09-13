import React, { Children } from 'react'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Main from '../main/Main'

import style from './AppLayout.module.css'

function AppLayout() {
  return (
    <>
      <div className={style.appContainer}>
        <NavBar />
        <div className={style.main}>
          <div>
            <SideBar />
          </div>

          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
    </>
  )
}

export default AppLayout
