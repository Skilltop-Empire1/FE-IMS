import React, { useState } from 'react';
import style from './passwordResetStyle.module.css';
import { useResetPasswordMutation } from '../../redux/APIs/passwordResetApi';
import { EyeIcon, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

const PasswordConfirmation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility]= useState(false)
  const [passwordVisibility2, setPasswordVisibility2]= useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation();

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that the password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Log the email and passwords to verify they are set
    // console.log('Email:', email);
    // console.log('Password:', password);
    // console.log('Confirm Password:', confirmPassword);
  
    try {
      // Call the resetPassword mutation with the correct payload
      const response = await resetPassword({ email, password, confirmPassword }).unwrap();
      setTimeout(()=>{
        navigate('/')
      }, 2000)
      // console.log('Response:', response); // Log response for debugging
    } catch (err) {
      console.error('Failed to reset password:', err);
      alert('Failed to reset password');
    }
  };
  

  // password visibilty
  const showPassword = () => {
    setPasswordVisibility(!passwordVisibility)
   }
   const showPassword2 = () => {
    setPasswordVisibility2(!passwordVisibility2)
   }

  return (
    <div className='flex justify-center items-center h-[100vh]'>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <h2 className='my-3'>Set New Password</h2>
          
          <input
            className = {style.input}
            type="email"
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <div className={`flex items-center justify-between gap-3 ${style.visi}`}>
            <input
              type={passwordVisibility? 'text' : 'password'}
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
           {passwordVisibility ? <EyeIcon onClick={showPassword} className={style.icon}/> : <EyeOff onClick={showPassword} className={style.icon}/>}
          </div>
          
          <div  className={`flex items-center justify-between gap-3 ${style.visi}`}>
            <input
              type={passwordVisibility2? 'text' : 'password'}
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
           {passwordVisibility2 ? <EyeIcon onClick={showPassword2} className={style.icon}/> : <EyeOff onClick={showPassword2} className={style.icon}/>}
          </div>
          
          <br />
          <button className='mb-4' type="submit" disabled={isLoading}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>              

        {isSuccess && <p>Password reset successful!</p>}
        {isError && <p className='mt-4'>Error resetting password: {error?.data?.message || 'Something went wrong'}</p>}
      </div>
    </div>
  );
};

export default PasswordConfirmation;
