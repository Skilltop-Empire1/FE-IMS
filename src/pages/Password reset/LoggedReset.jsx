import React, { useState, useEffect } from 'react';
import style from './passwordResetStyle.module.css';
import { useChangePasswordMutation } from '../../redux/APIs/passwordResetApi';
import { EyeIcon, EyeOff } from 'lucide-react';
import { jwtDecode } from 'jwt-decode'; 

const LoggedReset = ({onSuccess}) => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successful, setSuccessful] = useState('hidden')
  const [changePassword, { isLoading, isSuccess }] = useChangePasswordMutation();



  const token = localStorage.getItem('token');

  // Decode token and extract email
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode token once when component mounts
        setEmail(decodedToken?.email || ''); // Handle cases where email might be undefined
        // console.log(decodedToken.email); // Get 'email' in the field storing user emai
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [token]); // Only run this effect when 'token' changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that the password and confirm password match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Call the resetPassword mutation with the correct payload
      await changePassword({ email, oldPassword, password, confirmPassword }).unwrap();
      setTimeout(() => {
        setSuccessful('')
        if (onSuccess) {
          onSuccess(); // Trigger the callback to close the modal
        }
      }, 3000);
    } catch (err) {
      console.error('Failed to reset password:', err);
      alert('Failed to reset password');
    }
  };

  // Toggle password visibility
  const showPassword = () => {
    setPasswordVisibility(!passwordVisibility);
  };
  const showPassword2 = () => {
    setPasswordVisibility2(!passwordVisibility2);
  };

  return (
    <div className={`${style.container} mx-5 px-3 relative`}> 
        <div className={`absolute bottom-0 text-white bg-green-400 w-full text-center ${successful}`}>Password changed successfully</div>
      <form onSubmit={handleSubmit} className="x-3">
        <h2 className="my-3">Set New Password</h2>

        <div className={`flex items-center justify-between gap-3 ${style.visi}`}>
          <input
            type={passwordVisibility ? 'text' : 'password'}
            placeholder="Enter old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          {/* {passwordVisibility ? (
            <EyeIcon onClick={showPassword} className={style.icon} />
          ) : (
            <EyeOff onClick={showPassword} className={style.icon} />
          )} */}
        </div>
        <div className={`flex items-center justify-between gap-3 ${style.visi}`}>
          <input
            type={passwordVisibility ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* {passwordVisibility ? (
            <EyeIcon onClick={showPassword} className={style.icon} />
          ) : (
            <EyeOff onClick={showPassword} className={style.icon} />
          )} */}
        </div>

        <div className={`flex items-center justify-between gap-3 ${style.visi}`}>
          <input
            type={passwordVisibility2 ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {/* {passwordVisibility2 ? (
            <EyeIcon onClick={showPassword2} className={style.icon} />
          ) : (
            <EyeOff onClick={showPassword2} className={style.icon} />
          )} */}
        </div>

        <br />
        <button className="mb-4" type="submit" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      <p className='text-green-500'>{isSuccess && 'Password changes successfully'}</p>
    </div>
  );
};

export default LoggedReset;
