import React from 'react'

const TitleBar = ({ title = 'Personal Settings', subtitle, children }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="py-4">
        <h2 className="text-3xl my-2 font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export default TitleBar
