import React from 'react'
import style from './AddProduct.module.css'


const AddProduct = () => {
  return (
    <div className={`${style.body}`}>
      <div className={style.top}>
        <h2 className={style.title}>Add Product</h2>
      </div>
      <div >
        <form className={`${style.form} mx-4 my-5`}>
          <div className={style.cont}>
            <label className={style.label}>Name:</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Item code:</label>
            <input type="number" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Description:</label>
            <input type="textarea" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Quantity:</label>
            <input type="number" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Stores Available*</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Category*</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Product Alert Limit:</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Price*</label>
            <input type="text" className={style.input} />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Product photo:</label>
            <input type="file" />
          </div>
          <br />
          
          
            <div className='mt-8 flex items-center gap-4'>
             <input type="checkbox" name='check' className={`${style.check} flex items-center justify-center`}/>
             <label htmlFor="check">Add another product</label>
            </div>
            <div className='mt-5'>
              <button type='submit' className={style.submit}>Save products</button>
            </div>
          

        </form>
      </div>
    </div>
  )
}

export default AddProduct
