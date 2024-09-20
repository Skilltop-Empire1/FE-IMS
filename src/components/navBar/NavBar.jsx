import React, { useState, useEffect, useRef } from 'react'
import { Bell, Cog, User, Search } from 'lucide-react'
import imsLogo from '../../assets/ims-logo.png'
import style from './navBar.module.css'
import DropDown from '../dropDown/dropDown'
import { useNavigate } from 'react-router-dom'

const iconStyle = { color: '#8D46E2' }

function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null) // Reference for dropdown
  const navigate = useNavigate()

  // Toggle dropdown
  const openDropdown = () => setShowDropdown((prev) => !prev)

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false) // Close dropdown if clicked outside
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <nav className={style.navContainer}>
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
        <li onClick={() => navigate('/app/settings')}>
          <Cog size={24} style={iconStyle} />
        </li>
        <li onClick={openDropdown}>
          <User size={24} style={iconStyle} />
        </li>
      </ul>
      {showDropdown && (
        <div ref={dropdownRef}>
          <DropDown />
        </div>
      )}
    </nav>
  )
}

export default NavBar
