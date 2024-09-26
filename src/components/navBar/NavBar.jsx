import React from 'react'

import { Bell, Cog, User, Search } from 'lucide-react'
import imsLogo from '../../assets/ims-logo.png'
import style from './navBar.module.css'
import DropDown from '../dropDown/DropDown'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDropdown } from '../../redux/slices/dropdownSlice'
import { useGetPictureQuery } from '../../redux/APIs/profilePictureUploadApi'

const iconStyle = { color: '#8D46E2' }

function NavBar({ dropdownRef }) {
  const isShowDropDown = useSelector((state) => state.dropdown.isOpen)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: profilePic, isLoading, error } = useGetPictureQuery()
  console.log('profile picture data', profilePic)

  return (
    <nav className={`${style.navContainer} navbar`} ref={dropdownRef}>
      <ul className={style.leftNavs}>
        <li onClick={() => navigate('/app')}>
          <img src={imsLogo} alt="Product Logo" />
        </li>
        <li>
          <div className={style.searchContainer}>
            <input type="text" placeholder="Search" />
            <Search size={16} style={iconStyle} />
          </div>
        </li>
      </ul>
      <ul className={style.rightNavs}>
        <li>
          <Bell size={24} style={iconStyle} />
        </li>
        <li onClick={() => navigate('/app/settings')} aria-label="Settings">
          <Cog size={24} style={iconStyle} />
        </li>
        <li
          onClick={() => dispatch(toggleDropdown())}
          aria-label="User Dropdown"
        >
          {' '}
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <User size={24} style={iconStyle} />
          ) : (
            <img
              src={profilePic.profilePic}
              alt="Profile"
              className={style.profileImage}
            />
          )}
        </li>
      </ul>
      {isShowDropDown && <DropDown />}
    </nav>
  )
}

export default NavBar
