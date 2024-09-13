import React from 'react'
import style from './createStoreStyle.module.css'

const createStore = () => {
  return (
    <div className={`${style.body}`}>
      <div className={style.top}>
        <h2 className={style.title}>Create Store</h2>
      </div>
      <div >
        <form className={`${style.form} mx-4 my-5`}>
          <div className={style.cont}>
            <label className={style.label}>Store Name*</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Location:</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Description:</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Number of Staff</label>
            <input type="number" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Stores Manager</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Store Contact</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Store photo:</label>
            <input type="file" />
          </div>
          <br />
          
          
            <div className='mt-8 flex items-center gap-4'>
             <input type="checkbox" name='check' className={`${style.check} flex items-center justify-center`}/>
             <label htmlFor="check">Add another store</label>
            </div>
            <div className='mt-5'>
              <button type='submit' className={style.submit}>Save store</button>
            </div>
          

        </form>
      </div>
    </div>
  )
}

export default createStore
