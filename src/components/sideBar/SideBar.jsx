import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './Sidebar.module.css'

function SideBar() {
  return (
    <nav className={style.navContainer}>
      <ul>
        <li>
          <NavLink
            to="/app"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/products"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/categories"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Categories
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/stores"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Stores
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/salesRecord"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Sales Record
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/accounts"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Accounts
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/settings"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Settings
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink
            to="/app/addProduct"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default SideBar
