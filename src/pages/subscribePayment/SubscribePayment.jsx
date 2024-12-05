import React, { useEffect } from 'react'
import SubscriberListTable from '../../components/SubscribePayment/SubscriberListTable'
import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

const SubscribePayment = () => {
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
      <SubscriberListTable />
    </div>
  )
}

export default SubscribePayment
