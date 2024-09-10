import React from 'react'
import TitleBar from '../../components/settings/TitleBar'
import RolesPermissionsCard from '../settings/RolesPermissionsCard'
import StaffInviteForm from './StaffInviteForm'

function Staff() {
  return (
    <div>
      <TitleBar title="Staff Invite Setting" />
      <StaffInviteForm />
      {/* <RolesPermissionsCard showExport={false} /> */}
    </div>
  )
}

export default Staff
