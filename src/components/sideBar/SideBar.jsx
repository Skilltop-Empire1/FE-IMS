import React, { useState } from 'react'
import Modal from 'react-modal'
import { NavLink } from 'react-router-dom'
import Button from '../button/Button'
import style from './Sidebar.module.css'
import {
  Home,
  Box,
  Tag,
  Store,
  FileText,
  User,
  Settings,
  PlusCircle,
  UserPlus,
} from 'lucide-react'

Modal.setAppElement('#root')

function SideBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const handleLogout = () => {
    console.log('User logged out')
    closeModal()
  }

  return (
    <nav className={style.navContainer}>
      <ul>
        <li>
          <NavLink
            to="/app"
            end
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <Home className={style.iconStyle} />
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/products"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <Box className={style.iconStyle} />
            <span>Products</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/categories"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <Tag className={style.iconStyle} />
            <span>Categories</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/stores"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <Store className={style.iconStyle} />
            <span>Stores</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/salesRecords"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <FileText className={style.iconStyle} />
            <span>Sales Record</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/accounts"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <User className={style.iconStyle} />
            <span>Accounts</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/settings"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <Settings className={style.iconStyle} />
            <span>Settings</span>
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink
            to="/app/addStaff"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <UserPlus className={style.iconStyle} />
            <span>Add Staff</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/app/addProduct"
            className={({ isActive }) =>
              isActive ? style.activeLink : undefined
            }
          >
            <PlusCircle className={style.iconStyle} />
            <span>Add Product</span>
          </NavLink>
        </li>
        <li className={style.logout}>
          <Button
            onClick={openModal}
            className={style.logoutButton}
            buttonName="Logout"
          />
        </li>
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Logout"
        className={style.modal}
        overlayClassName={style.overlay}
      >
        <h2>Are you sure you want to logout?</h2>
        <div className={style.modalButtons}>
          <button onClick={handleLogout}>Yes, logout</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </nav>
  )
}

export default SideBar
