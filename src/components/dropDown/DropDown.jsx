import React, { useState } from 'react'
import { User, Camera, Lock, LogOut } from 'lucide-react'
import style from './Dropdown.module.css'
import ModalContainer from '../../modals/ModalContainer'
import ImagePicker from '../../modals/imagePicker/ImagePicker'
import Logout from '../../modals/logout/Logout'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/AuthSlice'

import styles from '../../components/sideBar/Sidebar.module.css'

function DropDown({ dropdownRef }) {
  const [modalType, setModalType] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const dispatch = useDispatch()

  const openModal = (type) => () => {
    setModalType(type)
    setActiveItem(type)
  }

  const closeModal = () => {
    setModalType(null)
    setActiveItem(null)
  }

  const handleLogout = async () => {
    dispatch(logout())
  }

  return (
    <div className={style.container} ref={dropdownRef}>
      <ul>
        <li
          onClick={openModal('add-profile-picture')}
          className={modalType === 'add-profile-picture' ? style.active : ''}
        >
          <User size={16} className="icon" />
          Add Profile Picture
        </li>
        <li
          onClick={openModal('update-profile-picture')}
          className={modalType === 'update-profile-picture' ? style.active : ''}
        >
          <Camera size={16} className="icon" />
          Update Profile Picture
        </li>
        <li
          onClick={openModal('change-password')}
          className={modalType === 'change-password' ? style.active : ''}
        >
          <Lock size={16} className="icon" />
          Change Password
        </li>
        <li
          onClick={openModal('logout')}
          className={modalType === 'logout' ? style.active : ''}
        >
          <LogOut size={16} className="icon" />
          Logout
        </li>
      </ul>
      <ModalContainer
        isOpen={modalType === 'add-profile-picture'}
        onClose={closeModal}
        content={<ImagePicker />}
      />
      <ModalContainer
        isOpen={modalType === 'update-profile-picture'}
        onClose={closeModal}
        content={<ImagePicker />}
      />
      <ModalContainer
        isOpen={modalType === 'change-password'}
        onClose={closeModal}
        content={<div>Change your account password.</div>}
      />
      <ModalContainer
        isOpen={modalType === 'logout'}
        onClose={closeModal}
        content={
          <Logout
            closeModal={closeModal}
            className={styles.modalButtons}
            handleLogout={handleLogout}
          />
        }
      />
    </div>
  )
}

export default DropDown
