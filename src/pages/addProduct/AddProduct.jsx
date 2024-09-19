import React, { useState, useEffect } from 'react'
import { useCreateProductMutation } from '../../redux/APIs/productApi' // Import createProduct mutation hook
import style from './AddProduct.module.css'
import { Navigate, useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [productName, setProductName] = useState('')
  const [itemCode, setItemCode] = useState('')
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState('')
  const [selectedStore, setSelectedStore] = useState({ id: '', name: '' }) // Store ID and Name
  const [category, setCategory] = useState('')
  const [alertLimit, setAlertLimit] = useState('')
  const [price, setPrice] = useState('')
  const [productPhoto, setProductPhoto] = useState(null)
  const [addAnother, setAddAnother] = useState(false)

  const [stores, setStores] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const [createProduct, { isLoading, error }] = useCreateProductMutation() // Using the mutation hook

  // Fetch stores and categories
  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch(
        'https://be-ims.onrender.com/api/IMS/store/all',
      )
      const data = await response.json()
      setStores(data)
      console.log(data)
    }

    const fetchCategories = async () => {
      const response = await fetch(
        'https://be-ims.onrender.com/api/IMS/category',
      )
      const data2 = await response.json()
      setCategories(data2.categories)
      console.log(data2)
      console.log(categories)
    }

    fetchStores()
    fetchCategories()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', productName)
    formData.append('itemCode', itemCode)
    // formData.append('description', description);
    formData.append('quantity', quantity)
    formData.append('storeId', Number(selectedStore.id)) // Submit the store ID
    formData.append('storeAvailable', selectedStore.name) // submit the store name
    formData.append('categoryId', category)
    formData.append('alertStatus', alertLimit)
    formData.append('price', price)
    if (productPhoto) {
      formData.append('image', productPhoto)
    }

    try {
      await createProduct(formData).unwrap()
      alert('Product created successfully!')
      navigate('/app/products')
      if (!addAnother) {
        setProductName('')
        setItemCode('')
        setDescription('')
        setQuantity('')
        setSelectedStore({ id: '', name: '' })
        setCategory('')
        setAlertLimit('')
        setPrice('')
        setProductPhoto(null)
      }
    } catch (err) {
      console.error('Failed to create product:', err)
    }
  }

  const handleStoreChange = (e) => {
    const selectedStoreId = Number(e.target.value) // Get the selected store ID
    const store = stores.find((store) => store.storeId === selectedStoreId) // Find the selected store object

    if (store) {
      setSelectedStore({ id: store.storeId, name: store.storeName }) // Store both id and name
    }
  }

  return (
    <div className={`${style.body}`}>
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
              required
            />
          </div>
          {/* <div className={style.cont}>
            <label className={style.label}>Description:</label>
            <input
              type="text"
              className={style.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div> */}
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
              value={selectedStore.id}
              onChange={handleStoreChange}
            >
              <option value="">Select store</option>
              {/* <option value="">Select Store</option> */}
              {stores.map((store) => {
                return (
                  <option key={store.storeId} value={store.storeId}>
                    {store.storeName}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Categories Dropdown */}
          <div className={style.cont}>
            <label className={style.label}>Category:</label>
            <select
              className={style.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => {
                return <option value={category.catId}>{category.name}</option>
              })}
            </select>
          </div>

          <div className={style.cont}>
            <label className={style.label}>Alert Status:</label>
            <input
              type="text"
              className={style.input}
              value={alertLimit}
              onChange={(e) => setAlertLimit(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Price:</label>
            <input
              type="number"
              className={style.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Product photo:</label>
            <input
              type="file"
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
              {isLoading ? 'Saving...' : 'Save product'}
            </button>
          </div>

          {error && <p className="error">Error: Unable to create product</p>}
        </form>
      </div>
    </div>
  )
}

export default AddProduct
