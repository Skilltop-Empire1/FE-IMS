import React, { useState } from 'react'
import style from './createStoreStyle.module.css'
import { useCreateStoreMutation } from '../../redux/APIs/storeApi'
import { Navigate, useNavigate } from 'react-router-dom'

const CreateStore = ({ userId }) => {
  // Local state to manage form inputs
  const [storeName, setStoreName] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [numberOfStaff, setNumberOfStaff] = useState('')
  const [storeManager, setStoreManager] = useState('')
  const [storeContact, setStoreContact] = useState('')
  const [storePhoto, setStorePhoto] = useState(null)
  const [addAnotherStore, setAddAnotherStore] = useState(false)
  const navigate = useNavigate()

  // RTK Query mutation hook
  const [createStore, { isLoading, error }] = useCreateStoreMutation()

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Create form data
    const formData = new FormData()
    formData.append('userId', parseInt(userId) || 3) // Ensures this is an integer
    formData.append('storeName', storeName)
    formData.append('location', location)
    formData.append('storeContact', storeContact)
    formData.append('description', description)
    formData.append('noOfStaff', parseInt(numberOfStaff)) // Ensures this is an integer
    formData.append('storeManager', storeManager)

    if (storePhoto) {
      formData.append('storePhoto', storePhoto)
    }

    // Log formData to check values before sending
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`)
    }

    try {
      const response = await createStore(formData).unwrap() // Sends POST request to create store
      if (addAnotherStore) {
        // Clear form if the user wants to add another store
        setStoreName('')
        setLocation('')
        setDescription('')
        setNumberOfStaff('')
        setStoreManager('')
        setStoreContact('')
        setStorePhoto(null)
      } else {
        alert('Store created successfully!')
        navigate('/app/stores') // Navigate to the store list page after successful creation
      }
    } catch (err) {
      console.error('Failed to create store: ', err)
    }
  }

  return (
    <div className={`${style.body}`}>
      <div className={style.top}>
        <h2 className={style.title}>Create Store</h2>
      </div>
      <div>
        <form className={`${style.form} mx-4 my-5`} onSubmit={handleSubmit}>
          <div className={style.cont}>
            <label className={style.label}>Store Name*</label>
            <input
              type="text"
              className={style.input}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              required
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Location:</label>
            <input
              type="text"
              className={style.input}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Description:</label>
            <input
              type="text"
              className={style.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Number of Staff</label>
            <input
              type="number"
              className={style.input}
              value={numberOfStaff}
              onChange={(e) => setNumberOfStaff(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Store Manager</label>
            <input
              type="text"
              className={style.input}
              value={storeManager}
              onChange={(e) => setStoreManager(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Store Contact</label>
            <input
              type="text"
              className={style.input}
              value={storeContact}
              onChange={(e) => setStoreContact(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Store photo:</label>
            <input
              type="file"
              onChange={(e) => setStorePhoto(e.target.files[0])}
            />
          </div>
          <br />

          <div className="mt-8 flex items-center gap-4">
            <input
              type="checkbox"
              name="check"
              className={`${style.check} flex items-center justify-center`}
              checked={addAnotherStore}
              onChange={() => setAddAnotherStore(!addAnotherStore)}
            />
            <label htmlFor="check">Add another store</label>
          </div>

          <div className="mt-5">
            <button type="submit" className={style.submit} disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save store'}
            </button>
          </div>

          {error && <p style={{ color: 'red' }}>Failed to create store</p>}
        </form>
      </div>
    </div>
  )
}

export default CreateStore
