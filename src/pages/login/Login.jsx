import React from 'react'
import style from './loginStyle.module.css'
import { useRedirectOnMobile } from '../../utilities/mobileRedirect'

const Login = () => {
  useRedirectOnMobile()

  return (
    <div className={style.body}>
      <div className={style.left}>
        <h2>Welcome back</h2>
        <div className={style.login}>
          <form action="" className={style.form}>
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
              <label htmlFor="passowrd">Password</label>
              <br />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                required
              />
            </div>
            <div className={style.submit}>
              <button type="submit" className={style.button2}>
                SIGN UP
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <a href="" className={style.forgot}>
                Forgot your password?
              </a>
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
