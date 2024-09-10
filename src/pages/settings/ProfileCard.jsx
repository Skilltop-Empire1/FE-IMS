import React from 'react'

const ProfileCard = () => {
  return (
    <div className="rounded-lg px-8 py-10 grid grid-cols-2 gap-4 bg-imsLightPurple/30">
      <div className="flex flex-col gap-4">
        <div>
          <p>
            Name <span className="text-red-800">*</span>
          </p>
          <p>John Hopkins</p>
        </div>
        <div>
          <p>
            Company Email <span className="text-red-800">*</span>
          </p>
          <p>j.hopkins@inventor.io</p>
        </div>
        <div>
          <p>
            Company Email <span className="text-red-800">*</span>
          </p>
          <p>**********************</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <p>Stores</p>
          <p>Leicester, UK</p>
        </div>
        <div>
          <p>Store</p>
          <p>94-K-6764-LE1</p>
        </div>
        <div>
          <p>Store</p>
          <p>Manager</p>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard
