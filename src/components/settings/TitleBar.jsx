import React from 'react'

const TitleBar = ({ title = 'Personal Settings' }) => {
  return (
    <div className="py-4">
      <p className="text-3xl font-bold">{title}</p>
    </div>
  )
}

export default TitleBar
