import React, { useState } from 'react'
import style from './signUpStyle.module.css'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../../redux/APIs/authApi'
import { EyeIcon, EyeOff } from 'lucide-react'

function Signup() {
  const navigate = useNavigate()
  const [signup, { isLoading, error }] = useSignupMutation()
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const userData = {
      userName: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    }

    try {
      await signup(userData).unwrap()
      navigate('/')
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
        <h2>Create Account</h2>
        <div className={style.login}>
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
            <div className={style.input2}>
              <label htmlFor="password">Password</label>
              <br />
              <div
                className={`flex items-center justify-between gap-3 ${style.sum}`}
              >
                <input
                  type={passwordVisibility ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter password"
                  required
                />
                {passwordVisibility ? (
                  <EyeIcon onClick={showPassword} className={style.icon} />
                ) : (
                  <EyeOff onClick={showPassword} className={style.icon} />
                )}
              </div>
            </div>
            {error && <p className={style.error}>{error.message}</p>}{' '}
            {/* Error display */}
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
        </div>
      </div>
      <div className={style.right}>
        <h2>Have an account?</h2>
        <h3>Continue your journey in one click</h3>
        <a href="/" className={style.toSignUp}>
          <button className={style.button}>Sign In</button>
        </a>
      </div>
    </div>
  )
}

export default Signup
