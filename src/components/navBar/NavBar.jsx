import React, { useState, useContext } from 'react'
import { BellIcon, CogIcon, Settings, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NotificationContext } from '../Notifications/NotificationContext'
import { Bell, Cog, User, Search } from 'lucide-react'
import imsLogo from '../../assets/ims-logo.png'
import style from './navBar.module.css'
import DropDown from '../dropDown/DropDown'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDropdown } from '../../redux/slices/dropdownSlice'
import { useGetPictureQuery } from '../../redux/APIs/profilePictureUploadApi'

const iconStyle = { color: '#8D46E2' };

function NavBar({ dropdownRef }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const openDropdown = () => setShowDropdown((prev) => !prev)
  const isShowDropDown = useSelector((state) => state.dropdown.isOpen)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data: profilePic, isLoading, error } = useGetPictureQuery()
  console.log('profile picture data', profilePic)

  const { notifications, hasNewNotification, setHasNewNotification } = useContext(NotificationContext);

  const handleNotificationClick = () => {
    setIsOpen(!isOpen)
    setHasNewNotification(false); // Mark the notification as seen
  };

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
        {/* WebSocket connection status indicator */}
        <li className="relative">
          {isConnected ? (
            <span className="text-green-500">Connected</span>
          ) : (
            <span className="text-red-500">Disconnected</span>
          )}
        </li>

        {/* Notifications Icon */}
        <li>
          <div className="relative mt-2">
          <button
            className="text-white relative"
            onClick={handleNotificationClick}
          >
            <Bell size={24} style={iconStyle} />
            {/* Render the notification badge */}
            {hasNewNotification && (
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500"></span>
            )}
          </button>

          {/* Notification Dropdown */}
          {
            isOpen && 
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg overflow-hidden">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200 hover:bg-gray-100"
                >
                  {notification}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">
                No new notifications
              </div>
            )}
          </div>
          }
        </div>
        </li>

        {/* Settings and Profile */}
        <li onClick={() => navigate('/app/settings')} aria-label="Settings">
          <Cog size={24} style={iconStyle} />
        </li>
        <li onClick={() => dispatch(toggleDropdown())} aria-label="User Dropdown">
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <User size={24} style={iconStyle} />
          ) : (
            <img src={profilePic.profilePic} alt="Profile" className={style.profileImage} />
          )}
        </li>
      </ul>
      {isShowDropDown && <DropDown />}

      {/* Alert message banner (optional) */}
      {alertMessage && (
        <div className="absolute bottom-0 left-0 w-full bg-yellow-100 text-yellow-800 px-4 py-2">
          <p>{alertMessage}</p>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
