import React from 'react'
import TitleBar from '../../components/settings/TitleBar'
import ProfileCard from './ProfileCard'
import RolesPermissionsCard from './RolesPermissionsCard'

function Settings() {
  return (
    <div>
      <TitleBar />
      <ProfileCard />
      <RolesPermissionsCard />
    </div>
  )
}

export default Settings
