import React from 'react'

function Logout({ handleLogout, closeModal, className }) {
  return (
    <div>
      <h2>Are you sure you want to logout?</h2>

      <div className={className}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={closeModal}>Cancel</button>
      </div>
    </div>
  )
}

export default Logout
