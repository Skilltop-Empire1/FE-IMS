import React, { useState } from 'react'
import style from './signUpStyle.module.css'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../../redux/APIs/authApi'
import { EyeIcon, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [signup, { isLoading, error, data, isSuccess }] = useSignupMutation()
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = {
      userName: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
      signupCode: formData.get('signupCode'),
    }

    console.log({ userData })
    return

    try {
      await signup(userData).unwrap()

      setTimeout(() => {
        navigate('/')
      }, 3000)
    } catch (err) {
      console.error('Signup failed:', err)
    }
  }

  const showPassword = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  return (
    <div className={style.body}>
      <div className={style.left}>
        <img
          src="/images/logo.png"
          alt="ims-logo"
          className=" md:w-28 md:hidden "
        />
        <h2>Create Account</h2>
        <h3>Create an account</h3>
        <div className={style.login}>
          {isSuccess && <p style={{ color: 'green' }}>{data?.msg} 😊</p>}
          {error && (
            <p style={{ color: 'red' }}>
              {error?.data?.msg ||
                'Sorry something went wrong, please try again later'}{' '}
              😔
            </p>
          )}
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.name}>
              <div className={style.input}>
                <label htmlFor="username">Username</label> <br />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter Username or Organization Name"
                  required
                />
              </div>
            </div>
            <div className={style.input}>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div className={style.input}>
              <label htmlFor="password">Password</label>
              <br />
              <div
                className={`flex items-center justify-between gap-3 py-2 ${style.sum}`}
              >
                <input
                  type={passwordVisibility ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter password"
                  className="border-2 !border-l-0 !border-r-0  !rounded-none flex-grow"
                  required
                />
                {passwordVisibility ? (
                  <EyeIcon onClick={showPassword} className={style.icon} />
                ) : (
                  <EyeOff onClick={showPassword} className={style.icon} />
                )}
              </div>
            </div>
            <div className={style.input}>
              <label htmlFor="email">Signup Code</label>
              <br />
              <input
                type="text"
                name="signupCode"
                placeholder="Enter Signup Code"
                required
              />
            </div>
            {error && <p className={style.error}>{error.message}</p>}{' '}
            <div className={style.submit}>
              <button
                type="submit"
                className={style.button2}
                disabled={isLoading}
              >
                {isLoading ? 'Signing Up...' : 'SIGN UP'}
              </button>
            </div>
          </form>
          <p className="mt-4 text-[#aba3d5] flex justify-center">
            Already have an account?
          </p>
          <Link to="/login" className={style.toSignUp}>
            <button className={style.button}>Sign In</button>
          </Link>
        </div>
      </div>
      <div className={style.right}>
        <h2>Have an account?</h2>
        <h3>Continue your journey in one click</h3>
        <Link to="/login" className={style.toSignUp}>
          <button className={style.button}>Sign In</button>
        </Link>
      </div>
    </div>
  )
}

export default Signup
