import { BellIcon, CogIcon, Settings, User2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div className="w-full fixed flex items-centes justify-between py-4 px-2 flex-wrap bg-gray-100">
      <div className="flex gap-10 items-center">
        <div>
          <Link to="" className="text-gray-800">
            Product/Logo
          </Link>
        </div>
        <div>
          <p className="text-imsLightPurple">Search</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <BellIcon size={20} className="text-imsPurple" />
        <Settings size={20} className="text-imsPurple" />
        <div className="w-8 h-8 rounded-full bg-imsDarkPurple flex justify-center items-center">
          <User2 size={20} className="text-imsLightPurple" />
        </div>
      </div>
    </div>
  )
}

export default NavBar
