import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/APIs/authApi' // Adjust the import path as needed
import { setCredentials } from '../../redux/slices/AuthSlice' // Adjust the import path as needed
import style from './loginStyle.module.css'
import { useNavigate } from 'react-router-dom'
import { useRedirectOnMobile } from '../../utilities/mobileRedirect'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  // useRedirectOnMobile();

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = await login({ email, password }).unwrap() // Execute login mutation
      dispatch(setCredentials({ token })) // Dispatch the token to Redux store
      navigate('/app') // Navigate to the dashboard or another page
    } catch (err) {
      console.error('Failed to login:', err) // Handle error
      alert('Login failed! Please check your credentials and try again.')
    }
  }

  return (
    <div className={style.body}>
      <div className={style.left}>
        <h2>Welcome back</h2>
        <div className={style.login}>
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.input}>
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={style.input}>
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={style.submit}>
              <button
                type="submit"
                className={style.button2}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'LOGIN'}
              </button>
            </div>
            <div className="flex justify-center mt-4">
              
              <a href="passwordReset" className={style.forgot}>Forgot your password?</a>
            </div>
          </form>
        </div>
      </div>

      <div className={style.right}>
        <h2>Don't have an account?</h2>
        <h3>Start your journey in one click</h3>
        <a href="signup" className={style.toSignUp}>
          <button className={style.button}>Sign Up</button>
        </a>
      </div>
    </div>
  )
}

export default Login
