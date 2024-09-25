import React from 'react'
import style from './passwordResetStyle.module.css'

const PasswordConfirmation = () => {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className={style.container}>
        <form action="">
          <h2 className="my-3">Set New Password</h2>
          <input type="text" placeholder="Enter password" className="mt-5" />
          <input type="text" placeholder="Confirm password" className="mt-5" />
          <br />
          <button className="mb-4">Reset Password</button>
        </form>
      </div>
    </div>
  )
}

export default PasswordConfirmation
