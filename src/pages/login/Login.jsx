import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../redux/APIs/authApi'
import { setCredentials } from '../../redux/slices/AuthSlice'
import style from './loginStyle.module.css'
import { useNavigate, Link } from 'react-router-dom'
import { EyeIcon, EyeOff } from 'lucide-react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const data = await login({
        email,
        password,
      }).unwrap()
      const { token, id, role, username } = data
      // console.log('Logged in:', data)
      dispatch(setCredentials({ token, role, id, username }))
      localStorage.setItem('token', token)

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: id,
          role: role,
          email: email,
          username: username,
        }),
      )

      navigate('/app')
    } catch (err) {
      console.error('Failed to login:', err)
      alert('Login failed! Please check your credentials and try again.')
    }
  }

  const showPassword = () => {
    setPasswordVisibility(!passwordVisibility)
  }

  return (
    <div className={style.body}>
      <div className={style.left}>
        <img src="/images/logo.png" alt="ims-logo" className=" md:w-28 md:hidden " />
        <h2>Welcome back</h2>
        <h3>Login</h3>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.input}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={style.input2}>
            <label htmlFor="password">Password</label>
            <div
              className={`flex items-center justify-between gap-3 ${style.sum}`}
            >
              <input
                type={passwordVisibility ? 'text' : 'password'}
                name="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordVisibility ? (
                <EyeIcon onClick={showPassword} className={style.icon}/>
              ) : (
                <EyeOff onClick={showPassword} className={style.icon}/>
              )}
            </div>
            <Link to="/passwordReset" className={style.forgot2}>
              Forgot your password?
            </Link>
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
          <Link to="/passwordReset" className={style.forgot}>
            Forgot your password?
          </Link>
        </form>
        <p className='mt-4 text-[#aba3d5]'>Don't have an account?</p>
        <Link to="/signup" className={style.toSignUp}>
          <button className={style.button}>Sign Up</button>
        </Link>
      </div>
      <div className={style.right}>
        <h2>Don't have an account?</h2>
        <h3>Start your journey in one click</h3>
        <Link to="/signup" className={style.toSignUp}>
          <button className={style.button}>Sign Up</button>
        </Link>
      </div>
    </div>
  )
}

export default Login
