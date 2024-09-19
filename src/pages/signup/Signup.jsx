import React from 'react'
import style from './signUpStyle.module.css'

function Signup() {
  return (
    <div className={style.body}>
    <div className={style.left}>
      <h2>Create Account</h2>
      <div  className={style.login}>
        <form action="" className={style.form}>
          <div  className={style.name}>
            <div  className={style.input}>
              <label htmlFor="firstName">Username</label>
              <br />
              <input type="text" name='firstName' placeholder="Enter Username" required/>
            </div>
          </div>
          <div  className={style.input}>
              <label htmlFor="email">Email</label>
              <br />
              <input type="email" name='email' placeholder="Enter email" required/>
            </div>
            <div   className={style.input}>
              <label htmlFor="passowrd">Password</label>
              <br />
              <input type="password" name='password' placeholder="Enter password" required/>
            </div>

         <div className={style.submit}>
          <button type='submit' className={style.button2}>SIGN UP</button>
         </div>
        </form>
      </div>
    </div>



    <div className={style.right}>
     <h2> Have an account?</h2>
     <h3>Continue  your journey in one click</h3>
     <a href="/"  className={style.toSignUp}>

      <button className={style.button}>Sign In</button>
     </a>
    </div>

  </div>
  )
}

export default Signup
