import React, {  useState} from 'react'
import style from './passwordResetStyle.module.css'
import { useRequestPasswordResetMutation } from '../../redux/APIs/passwordResetApi'

const PasswordReset = () => {
  const [email, setEmail] = useState('')
  const [requestPasswordReset, { isLoading, isSuccess, isError, error }] = useRequestPasswordResetMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestPasswordReset(email);
  };


  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div  className={style.container}>
        <form action="" onSubmit={handleSubmit}>
           <h2 className='my-3'>Forgot Password</h2>
            <input
             type="email"
             placeholder='Enter email' 
             className='mt-10' 
             value={email} 
             onChange={(e) => setEmail(e.target.value)}
             required/>
            <br />
            <button type='submit' disabled={isLoading}>Reset  Password</button>

        </form>

        {isSuccess && <p>Check your email for a password reset link.</p>}
        {isError && <p>Error: {error.data?.message}</p>} 
      </div>
    </div>
  )
}

export default PasswordReset
