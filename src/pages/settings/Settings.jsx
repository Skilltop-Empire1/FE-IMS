import React from 'react'
import TitleBar from '../../components/settings/TitleBar'
import ProfileCard from './ProfileCard'
import RolesPermissionsCard from './RolesPermissionsCard'
import StaffTable from './StaffTable'

function Settings() {
  return (
    <div>
      <TitleBar />
      <StaffTable />
      <RolesPermissionsCard />
    </div>
  )
}

export default Settings
