import React, { Children } from 'react'
import NavBar from '../navBar/NavBar'
import SideBar from '../sideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Main from '../main/Main'

function AppLayout() {
  return (
    <>
      <div className="w-full min-h-[100vh] bg-white text-gray-800">
        <NavBar />
        <div className="border h-full w-full flex gap-2">
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
