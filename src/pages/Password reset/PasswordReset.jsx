import React from 'react'
import style from './passwordResetStyle.module.css'

const PasswordReset = () => {
  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div  className={style.container}>
        <form action="">
        <h2 className='my-3'>Forgot Password</h2>
            <input type="text" placeholder='Enter email' className='mt-10'/>
            <br />
            <button>Reset  Password</button>

        </form>
      </div>
    </div>
  )
}

export default PasswordReset
