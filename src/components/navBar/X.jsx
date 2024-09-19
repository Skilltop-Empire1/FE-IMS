import React from 'react'

const X = () => {
  return (
    <div className="w-full fixed flex items-centes justify-between py-4 px-2 flex-wrap bg-gray-100">
      <div className="flex gap-10 items-center">
        <div className="px-4">
          <Link to="" className="text-gray-800 inline-block h-[43px]">
            <img src="/images/logo.png" className=" h-[38px] w-auto" />
          </Link>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="indent-2 p-1 text-sm text-imsPurple"
          />
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

export default X
