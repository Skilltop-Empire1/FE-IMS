import React, { useState } from 'react'
import { User, Camera, Lock, LogOut } from 'lucide-react'
import style from './Dropdown.module.css'
import ModalContainer from '../../modals/modalContainer'
import ImagePicker from '../../modals/imagePicker/ImagePicker'

function DropDown() {
  const [modalType, setModalType] = useState(null)
  const [activeItem, setActiveItem] = useState(null)

  const openModal = (type) => () => {
    setModalType(type)
    setActiveItem(type)
  }

  const closeModal = () => {
    setModalType(null)
    setActiveItem(null)
  }

  return (
    <div className={style.container}>
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
        content={<div>Are you sure you want to logout?</div>}
      />
    </div>
  )
}

export default DropDown
