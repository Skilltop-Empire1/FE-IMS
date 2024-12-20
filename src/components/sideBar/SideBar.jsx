import React, { useState } from 'react'
import Modal from 'react-modal'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import style from './Sidebar.module.css'
import {
  Home,
  Box,
  Tag,
  Store,
  FileText,
  User,
  Settings,
  DollarSign,
  PlusCircle,
  UserPlus,
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout as clearAuth } from '../../redux/slices/AuthSlice'
import Logout from '../../modals/logout/Logout'

Modal.setAppElement('#root')

function SideBar({ closeMenu }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const role = JSON.parse(localStorage.getItem('user'))?.role
  const isSuperAdmin = role && role === 'superAdmin'

  const dispatch = useDispatch()

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const handleLogout = async () => {
    dispatch(clearAuth())
  }

  return (
    <nav className={`${style.navContainer}`}>
      <div onClick={closeMenu} className={style.closeMenu}>
        <p>X</p>
      </div>
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
        {isSuperAdmin && (
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
        )}
        {isSuperAdmin && (
          <li>
            <NavLink
              to="/app/subscriber-payment"
              className={({ isActive }) =>
                isActive ? style.activeLink : undefined
              }
            >
              <DollarSign className={style.iconStyle} />
              <span>Subscription</span>
            </NavLink>
          </li>
        )}
      </ul>
      <ul>
        <li>
          <NavLink
            to="/app/staff"
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
          <button onClick={openModal} className={style.logoutButton}>
            Logout
          </button>
          {/* <Button
            onClick={openModal}
            className={style.logoutButton}
            buttonName="Logout"
          /> */}
        </li>
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Logout"
        className={style.modal}
        overlayClassName={style.overlay}
      >
        <Logout
          className={style.modalButtons}
          closeModal={closeModal}
          handleLogout={handleLogout}
        />
      </Modal>
    </nav>
  )
}

export default SideBar
