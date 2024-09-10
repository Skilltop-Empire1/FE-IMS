import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div>
      <p>sorry!! cant find page 😔</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )
}

export default NotFound
