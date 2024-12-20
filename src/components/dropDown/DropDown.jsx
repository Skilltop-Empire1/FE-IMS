import React, { useState } from 'react'
import { ReactDOM } from 'react'
import { User, Camera, Lock, LogOut } from 'lucide-react'
import style from './Dropdown.module.css'
import ModalContainer from '../../modals/ModalContainer'
import ImagePicker from '../../modals/imagePicker/ImagePicker'
import Logout from '../../modals/logout/Logout'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/slices/AuthSlice'
import LoggedReset from '../../pages/Password reset/LoggedReset'

import styles from '../../components/sideBar/Sidebar.module.css'
import { useLoginMutation } from '../../redux/APIs/authApi'

function DropDown({ dropdownRef }) {
  const { username, role, id } = JSON.parse(localStorage.getItem('user'))

  const [modalType, setModalType] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  const [showFullId, setShowFullId] = useState(false)

  const openModal = (type) => () => {
    setModalType(type)
    setActiveItem(type)
  }

  const closeModal = () => {
    setModalType(null)
    setActiveItem(null)
  }

  const slicedId = id.slice(0, 5)

  const dispatch = useDispatch()

  const handleLogout = async () => {
    dispatch(logout())
  }

  return (
    <div className={style.container} ref={dropdownRef}>
      <div className={style.userData}>
        <p>
          <span>user:</span> {username}
        </p>
        <p>
          <span>Role:</span> {role}
        </p>
        <p
          style={{ cursor: 'pointer' }}
          onClick={() => setShowFullId((prev) => !prev)}
        >
          <span>ID:</span> {slicedId}...
        </p>
        {showFullId && <p>{id}</p>}
      </div>

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
        content={<ImagePicker closeModal={closeModal} />}
      />
      <ModalContainer
        isOpen={modalType === 'update-profile-picture'}
        onClose={closeModal}
        content={<ImagePicker closeModal={closeModal} />}
      />
      <ModalContainer
        isOpen={modalType === 'change-password'}
        onClose={closeModal}
        content={<LoggedReset onSuccess={closeModal} />}
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
