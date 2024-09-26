import React, { useState } from 'react';
import style from './passwordResetStyle.module.css';
import { useRequestPasswordResetMutation } from '../../redux/APIs/passwordResetApi';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [requestPasswordReset, { isLoading, isSuccess, isError, error }] = useRequestPasswordResetMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestPasswordReset(email).unwrap(); // Unwrapping to handle potential rejection
    } catch (err) {
      console.error('Password reset request failed: ', err);
    }
  };

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div  className={style.container}>
        <form action="">
        <h2 className='my-3'>Forgot Password</h2>
            <input type="text" placeholder='Enter email' className='mt-10'/>
            <br />
            <button>Reset  Password</button>

        </form>

        {isSuccess && <p className='mt-3'>An email has been sent to you with a link to reset your password. If not seen in your inbox, please check your spam.</p>}
        {isError && <p>Error: {error?.data?.msg || 'Something went wrong.'}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
