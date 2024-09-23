import React, { Children } from 'react'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Main from '../main/Main'

import style from './AppLayout.module.css'
import { useRedirectOnMobile } from '../../utilities/mobileRedirect'

function AppLayout() {
  // useRedirectOnMobile() //commented out for backwards compatibility during development
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
      {/* </div> */}
    </>
  )
}

export default AppLayout
