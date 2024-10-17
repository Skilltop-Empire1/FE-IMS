import React, { useState, useEffect } from 'react'
import { useCreateSalesRecordMutation  } from '../../redux/APIs/salesRecordApi' // Import createSale mutation hook
import style from './addSalesRecordStyle.module.css'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useGetStoresQuery } from '../../redux/APIs/storeApi'
import { useGetCategoriesQuery } from '../../redux/categoryApi'
import {  useGetProductsQuery } from '../../redux/APIs/productApi'


const AddSaleRecord = () => {
  const [userId, setUserId] = useState() // Assuming user ID is predefined
  const [productId, setProductId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cash') // Default to cash
  const [quantity, setQuantity] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [storeId, setStoreId] = useState('') // Store ID
  const [success, setSuccess] = useState('hidden')
  const [stores, setStores] = useState([])
  const [categories, setCategories] = useState([])
  const [formError, setFormError] = useState('')
  const [addAnother, setAddAnother]= useState(false)
  const [products, setProducts] = useState([]) // Assuming you also need a product list
  
  const { data: store, isLoading: storeLoading, error: storeError } = useGetStoresQuery()
  const { data: categorys, isLoading: categorysLoading, error: categorysError } = useGetCategoriesQuery()
  const { data: product, error: productError, isLoading: productLoading } = useGetProductsQuery()
  const [createSalesRecord, { isLoading, error }] = useCreateSalesRecordMutation () // Using the mutation hook
  const navigate = useNavigate()

 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.user); // Assuming the token contains a userId field
      // console.log(userId)
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const currentDate = new Date().toISOString() // Get the current date in ISO format

    const saleRecordData = {
      userId: (userId) , 
      productId: (productId),
      paymentMethod,
      quantity: (quantity),
      categoryId: (categoryId),
      storeId: (storeId),
      soldDate: currentDate, // Automatically set the current date
    }

    try {
      await createSalesRecord(saleRecordData).unwrap()
      setSuccess('')
        // revert success message 
        setTimeout(() => {
          setSuccess('hidden') 
        }, 3000)

        if(addAnother) {
          setPaymentMethod('cash')
          setCategories(data.categories)
          setProducts(data)
          setQuantity('')
          setStores(data)
          
        }
        else {
          navigate('/app/salesRecords')
        }

    } catch (err) {
      console.error('Failed to create sale record:', err)

      if (err?.data?.msg) {
        setFormError(err.data.msg)
        // alert(err.data.msg)
      } else if (err?.error) {
        setFormError(err.error)
        // alert(err.error)
      } else {
        setFormError('An unexpected error occurred. Please try again.')
      }
    }
  }

  return (
    <div className={`${style.body} relative`}>
      <div className='absolute w-full ease-in-out duration-300'>
        <p className={`text-center bg-green-400 py-3 ${success}`} style={{ color: '#fff' }}>record saved successfully</p>
      </div>
      <div className={style.top}>
        <h2 className={style.title}>Add Sale Record</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={`${style.form} mx-4 my-5`}>

          {/* Product ID */}
          <div className={style.cont}>
            <label className={style.label}>Product:</label>
            <select
              className={style.input}
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">Select Product</option>
              { productLoading ? (
                <option value="">Loading product</option>
              ) : productError ? (
                <option value="">Error loading product</option>
              ) : (
                product.length > 0 ?
                product.map((product) => (
                  <option key={product.prodId} value={product.prodId}>
                    {product.name}
                  </option>
                 )) :
                 <option value="">No products Created</option>
                 )}
            </select>
          </div>

          {/* Payment Method */}
          <div className={style.cont}>
            <label className={style.label}>Payment Method:</label>
            <select
              className={style.input}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="cash">Cash</option>
              <option value="POS">POS</option>
              <option value="transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Quantity */}
          <div className={style.cont}>
            <label className={style.label}>Quantity:</label>
            <input
              type="number"
              className={style.input}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          {/* Store */}
          <div className={style.cont}>
            <label className={style.label}>Store:</label>
            <select
              className={style.input}
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
            >
               <option value="">Select store</option>
              {storeLoading ? (
                <option value="">Loading stores</option>
              ) : storeError ? (
                <option value="">Error loading stores</option>
              ) : (
                store.length > 0 ? 
                store.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option> 
                )) :
                  <option value="">No stores available</option>
              )}
            </select>
          </div>

          {/* Category */}
          <div className={style.cont}>
            <label className={style.label}>Category:</label>
            <select
              className={style.input}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categorysLoading ? (
                <option value="">Loading Categories</option>
              ) : categorysError ? (
                <option value="">Error Loading Categories</option>
              ) : (
                categorys.categories.length > 0 ?
                categorys.categories.map((category) => (
                  <option key={category.catId} value={category.catId}>
                    {category.name}
                  </option>
                )) :
                <option value="">No category has been created</option>
              )}
            </select>
          </div>


            <br />
            <div className="mt-8 flex items-center gap-4">
            <input
              type="checkbox"
              name="check"
              checked={addAnother}
              onChange={(e) => setAddAnother(e.target.checked)}
              className={`${style.check} flex items-center justify-center`}
            />
            <label htmlFor="check">Add another record</label>
          </div>
          <div className="mt-5">
            <button type="submit" className={style.submit} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Sale Record'}
            </button>
          </div>
          {error && <p className="error mt-5 text-red-500">{error.data?.message }</p>}
        </form>
      </div>
    </div>
  )
}

export default AddSaleRecord
