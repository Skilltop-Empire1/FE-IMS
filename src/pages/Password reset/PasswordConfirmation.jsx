import React, { useState } from 'react';
import style from './passwordResetStyle.module.css';
import { useResetPasswordMutation } from '../../redux/APIs/passwordResetApi';

const PasswordConfirmation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Call the resetPassword mutation
      await resetPassword({ email, password });
      // alert('Password has been reset successfully!');
    } catch (err) {
      console.error('Failed to reset password:', err);
      alert('Failed to reset password')
    }
  };

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <h2 className='my-3'>Set New Password</h2>
          
          <input
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder='Enter password'
            className='mt-5'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <input
            type="password"
            placeholder='Confirm password'
            className='mt-5'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <br />
          <button className='mb-4' type="submit" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        {isSuccess && <p>Password reset successful!</p>}
        {isError && <p>Error resetting password: {error?.data?.message || 'Something went wrong'}</p>}
      </div>
    </div>
  );
};

export default PasswordConfirmation;
