import React, { useState } from 'react';
import style from './passwordResetStyle.module.css';
import { useRequestPasswordResetMutation } from '../../redux/APIs/passwordResetApi';
import { Link } from 'react-router-dom';

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
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <h2 className='my-3'>Forgot Password</h2>
          <input
            className={`${style.input} mt-10`}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Reset Password'}
          </button>

    

        </form>

        {isSuccess && <p className='mt-3 mx-3'>An email has been sent to you with a link to reset your password. If not seen in your inbox, please check your spam.</p>}
        {isError && <p className='mt-5'> {'Something went wrong. Ensure your email is correct'}</p>}
      </div>
    </div>
  );
};

export default PasswordReset;
