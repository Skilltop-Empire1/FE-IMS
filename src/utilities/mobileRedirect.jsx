import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRedirectOnMobile = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isDesktop = () => window.innerWidth >= 1180

    const redirectToMobileWarning = () => {
      if (!isDesktop()) {
        navigate('/mobile-warning')
      }
    }

    redirectToMobileWarning()

    window.addEventListener('resize', redirectToMobileWarning)

    return () => {
      window.removeEventListener('resize', redirectToMobileWarning)
    }
  }, [navigate])

  return null
}
