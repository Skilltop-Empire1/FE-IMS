import React, { useState, useEffect } from 'react'
import { useCreateSalesRecordMutation  } from '../../redux/APIs/salesRecordApi' // Import createSale mutation hook
import style from './addSalesRecordStyle.module.css'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

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
  const [addAnother, setAddAnother]= useState(false)
  const [products, setProducts] = useState([]) // Assuming you also need a product list
  
  const [createSalesRecord, { isLoading, error }] = useCreateSalesRecordMutation () // Using the mutation hook
  const navigate = useNavigate()

  // Fetch stores, categories, and products
  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch(
        'https://be-ims-production.up.railway.app/api/IMS/store/all',
      )
      const data = await response.json()
      setStores(data)
    }

    const fetchCategories = async () => {
      const response = await fetch(
        'https://be-ims-production.up.railway.app/api/IMS/category',
      )
      const data = await response.json()
      setCategories(data.categories)
    }

    const fetchProducts = async () => {
      const response = await fetch(
        'https://be-ims-production.up.railway.app/api/IMS/product',
      )
      const data = await response.json()
      setProducts(data)
    }

    fetchStores()
    fetchCategories()
    fetchProducts()
  }, [])

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
      userId: Number(userId) , 
      productId: Number(productId),
      paymentMethod,
      quantity: Number(quantity),
      categoryId: Number(categoryId),
      storeId: Number(storeId),
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
    }
  }

  return (
    <div className={`${style.body} relative`}>
      <div className='absolute w-full ease-in-out duration-300'>
        <p className={`text-center bg-green-400 py-3 ${success}`} style={{ color: '#fff' }}>Product saved successfully</p>
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
              {products.map((product) => (
                <option key={product.prodId} value={product.prodId}>
                  {product.name}
                </option>
              ))}
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
              <option value="credit">POS</option>
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
              <option value="">Select Store</option>
              {stores.map((store) => (
                <option key={store.storeId} value={store.storeId}>
                  {store.storeName}
                </option>
              ))}
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
              {categories.map((category) => (
                <option key={category.catId} value={category.catId}>
                  {category.name}
                </option>
              ))}
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
            <label htmlFor="check">Add another product</label>
          </div>
          <div className="mt-5">
            <button type="submit" className={style.submit} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Sale Record'}
            </button>
          </div>
            <br />
          {error && <p className="error mt-5 text-red-500">Error: Unable to create sale record</p>}
        </form>
      </div>
    </div>
  )
}

export default AddSaleRecord
