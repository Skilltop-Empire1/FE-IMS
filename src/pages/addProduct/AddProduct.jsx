import React, { useState, useEffect } from 'react'
import { useCreateProductMutation } from '../../redux/APIs/productApi'
import style from './AddProduct.module.css'
import { useNavigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import { useGetStoresQuery } from '../../redux/APIs/storeApi'
import { useGetCategoriesQuery } from '../../redux/categoryApi'

const AddProduct = () => {
  const [productName, setProductName] = useState('')
  const [itemCode, setItemCode] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [selectedStore, setSelectedStore] = useState({ id: '', name: '' })
  const [category, setCategory] = useState('')
  const [alertLimit, setAlertLimit] = useState('')
  const [price, setPrice] = useState('')
  const [productPhoto, setProductPhoto] = useState(null)
  const [formError, setFormError] = useState('')
  const [addAnother, setAddAnother] = useState(false)
  const [saveMessage, setSaveMessage] = useState(false)
  const [success, setSuccess] = useState('hidden')
  const [stores, setStores] = useState([])
  const [categories, setCategories] = useState([])
  const [userId, setUserId] = useState(null)
  const navigate = useNavigate()

  const { data: store, isLoading: storeLoading, error: storeError } = useGetStoresQuery()
  const { data: categorys, isLoading: categorysLoading, error: categorysError } = useGetCategoriesQuery()

  const [createProduct, { isLoading, error }] = useCreateProductMutation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwtDecode(token)
      setUserId(decodedToken.user)
    }
  }, [])

  useEffect(() => {
    if (store) {
      setStores(store) // Ensure store is set only if data exists
    }
  }, [store])

  useEffect(() => {
    if (categorys) {
      setCategories(categorys) // Ensure categories are set only if data exists
    }
  }, [categorys])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', productName)
    formData.append('itemCode', itemCode)
    formData.append('quantity', quantity)
    formData.append('storeId', selectedStore.id)
    formData.append('storeAvailable', selectedStore.name)
    formData.append('categoryId', category)
    formData.append('alertStatus', alertLimit)
    formData.append('price', price)
    if (productPhoto) {
      formData.append('prodPhoto', productPhoto)
    }

    try {
      await createProduct(formData).unwrap()
      setSaveMessage(true)
      setSuccess('')
      setTimeout(() => {
        setSuccess('hidden')
      }, 3000)

      if (addAnother) {
        setProductName('')
        setItemCode('')
        setDescription('')
        setQuantity('')
        setSelectedStore({ id: '', name: '' })
        setCategory('')
        setAlertLimit('')
        setPrice('')
        setProductPhoto(null)
        setAddAnother(false)
        setSaveMessage(false)
      } else {
        navigate('/app/products')
      }
    } catch (err) {
      console.error('Failed to create product:', err)

      if (err?.data?.message) {
        setFormError(err.data.msg)
      } else if (err?.error) {
        setFormError(err.error)
      } else {
        setFormError('An unexpected error occurred. Please try again.')
      }
    }
  }

  const handleStoreChange = (e) => {
    const selectedStoreId = e.target.value; // Get the selected store ID as a string
    console.log('Selected Store ID:', selectedStoreId); // Debug log
  
    // Check if the selectedStoreId is valid
    const selected = stores.find((s) => s.storeId === selectedStoreId);
    if (selected) {
      console.log('Selected Store:', selected); // Debug log
      setSelectedStore({ id: selected.storeId, name: selected.storeName });
    }
  };
  
  
  


  return (
    <div className={`${style.body} relative`}>
      <div className="absolute w-full ease-in-out duration-300">
        <p className={`text-center bg-green-400 py-3 ${success}`} style={{ color: '#fff' }}>
          Product saved successfully
        </p>
      </div>
      <div className={style.top}>
        <h2 className={style.title}>Add Product</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit} className={`${style.form} mx-4 my-5`}>
          <div className={style.cont}>
            <label className={style.label}>Name:</label>
            <input
              type="text"
              className={style.input}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Item code:</label>
            <input
              type="text"
              className={style.input}
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Quantity:</label>
            <input
              type="text"
              className={style.input}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Stores Dropdown */}
          <div className={style.cont}>
            <label className={style.label}>Stores Available:</label>

            <select
              className={style.input}
              value={selectedStore.id} // Use selectedStore.id here
              onChange={handleStoreChange}
              required
            >
              <option value="">Select store</option>
              {storeLoading ? (
                <option value="">Loading stores</option>
              ) : storeError ? (
                <option value="">Error loading stores</option>
              ) : stores.length > 0 ? (
                stores.map((store) => (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option>
                ))
              ) : (
                <option value="">No stores available</option>
              )}
            </select>

          </div>

          {/* Categories Dropdown */}
          <div className={style.cont}>
            <label className={style.label}>Category:</label>
            <select
              className={style.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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

          <div className={style.cont}>
            <label className={style.label}>Alert limit*</label>
            <input
              type="text"
              className={style.input}
              value={alertLimit}
              onChange={(e) => setAlertLimit(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Price*</label>
            <input
              type="number"
              className={style.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Product Photo*</label>
            <input
              type="file"
              accept="image/*"
              className={style.input}
              onChange={(e) => setProductPhoto(e.target.files[0])}
            />
          </div>
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
              {isLoading ? 'Saving...' : saveMessage ? 'Saved' : 'Save product'}
            </button>
          </div>

          {error && (
            <p className="error mt-5" style={{ color: 'red' }}>
              {formError}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddProduct
