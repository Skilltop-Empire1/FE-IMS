import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import TitleBar from '../../components/settings/TitleBar'
import StaffTable from './StaffTable'

function Settings() {
  const token = useSelector((state) => state.auth.token)
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token)
      if (decodedToken.role !== 'superAdmin') {
        navigate('/app') // Redirect to /app if the role is not SuperAdmin
      }
    }
  }, [token, navigate])

  return (
    <div>
      <TitleBar title="Owner Settings-Users" />
      <StaffTable />
    </div>
  )
}

export default Settings
