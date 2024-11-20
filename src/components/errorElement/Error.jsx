import React from 'react'
import style from './error.module.css'
import { useNavigate } from 'react-router-dom'

function Error() {
  const navigate = useNavigate()
  return (
    <div className={style.errorContainer}>
      <h1 className={style.errorTitle}>Something went wrong.</h1>
      <p className={style.errorMessage}>Please try again later.</p>
      <button className={style.errorButton} onClick={() => navigate(-1)}>
        Return to Homepage
      </button>
    </div>
  )
}

export default Error
