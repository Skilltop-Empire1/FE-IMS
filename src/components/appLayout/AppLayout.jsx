import React, { Children } from 'react'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Main from '../main/Main'

function AppLayout() {
  return (
    <>
      <div>
        <NavBar />
        <div>
          <SideBar />
          <Main>
            <Outlet />
          </Main>
        </div>
      </div>
    </>
  )
}

export default AppLayout
