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
  PlusCircle,
  UserPlus,
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout as clearAuth } from '../../redux/slices/AuthSlice'

Modal.setAppElement('#root')

function SideBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const dispatch = useDispatch()

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const handleLogout = async () => {
    dispatch(clearAuth())
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
          <button onClick={handleLogout}>Logout</button>
          <button onClick={closeModal}>Cancel</button>
        </div>
      </Modal>
    </nav>
  )
}

export default SideBar

// const routes = [
//   {
//     label: 'Home',
//     path: '',
//     icon: <HomeIcon size={15} className="group-hover:animate-pulse" />,
//   },
//   {
//     label: 'Products',
//     path: 'products',
//     icon: <FileIcon size={15} className="group-hover:animate-pulse" />,
//   },
//   {
//     label: 'Categories',
//     path: 'categories',
//     icon: <GroupIcon size={15} className="group-hover:animate-pulse" />,
//   },
//   {
//     label: 'Stores',
//     path: 'stores',
//     icon: <StoreIcon size={15} className="group-hover:animate-pulse" />,
//   },
//   {
//     label: 'Sales Records',
//     path: 'sales-records',
//     icon: <SparklesIcon size={15} className="group-hover:animate-pulse" />,
//   },
//   {
//     label: 'Account',
//     path: 'accounts',
//     icon: <DollarSign size={15} className="group-hover:animate-pulse" />,
//   },
//   {
//     label: 'Settings',
//     path: 'settings',
//     icon: <SearchSlashIcon size={15} className="group-hover:animate-pulse" />,
//   },
// ]
