import React, { useState, useEffect } from 'react';
import style from './createStoreStyle.module.css';
import { useCreateStoreMutation } from '../../redux/APIs/storeApi';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';




const CreateStore = () => {
  const [storeName, setStoreName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfStaff, setNumberOfStaff] = useState('');
  const [success, setSuccess] = useState('hidden')
  const [saveMessage, setSaveMessage] = useState(false)
  const [storeManager, setStoreManager] = useState('');
  const [storeContact, setStoreContact] = useState('');
  const [storePhoto, setStorePhoto] = useState(null);
  const [addAnotherStore, setAddAnotherStore] = useState(false);
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null)

  // RTK Query mutation hook
  const [createStore, { isLoading, error }] = useCreateStoreMutation();


  // Extract userId from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.user); // Assuming the token contains a userId field
      // console.log(userId)
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous form error
    setFormError('');

    // Create form data
    const formData = new FormData();
    // formData.append('userId', parseInt(userId));
    formData.append('storeName', storeName);
    formData.append('location', location);
    formData.append('storeContact', storeContact);
    formData.append('description', description);
    formData.append('noOfStaff', parseInt(numberOfStaff));
    formData.append('storeManager', storeManager);

    if (storePhoto) {
      formData.append('storePhoto', storePhoto);
    }

    try {
        const response = await createStore(formData).unwrap();
        setSaveMessage(true)
        setSuccess('')

        // revert success message 
        setTimeout(() => {
          setSuccess('hidden') 
        }, 3000)


      if (addAnotherStore) {
        // Clear form if the user wants to add another store
        setStoreName('');
        setLocation('');
        setDescription('');
        setNumberOfStaff('');
        setStoreManager('');
        setStoreContact('');
        setStorePhoto(null);
      } else {
        alert('Store created successfully!');
        navigate('/app/stores');
      }
    } catch (err) {
      console.error('Failed to create store:', err);

      // Display the backend error message if available
      if (err?.data?.error) {
        setFormError(err.data.error); // Use the error message from the backend
      } else if (err?.error) {
        setFormError(err.error); // Fallback for RTK Query error message
      } else {
        setFormError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className={`${style.body} relative`}>
      <div className='absolute w-full ease-in-out duration-300'>
        <p className={`text-center bg-green-400 py-3 ${success}`} style={{ color: '#fff' }}>Product saved successfully</p>
      </div>
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
            <label className={style.label}>Location*</label>
            <input
              type="text"
              className={style.input}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Description*</label>
            <input
              type="text"
              className={style.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Number of Staff*</label>
            <input
              type="number"
              className={style.input}
              value={numberOfStaff}
              onChange={(e) => setNumberOfStaff(e.target.value)}
              required
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Store Manager*</label>
            <input
              type="text"
              className={style.input}
              value={storeManager}
              onChange={(e) => setStoreManager(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Store Contact*</label>
            <input
              type="text"
              className={style.input}
              value={storeContact}
              onChange={(e) => setStoreContact(e.target.value)}
              required
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Store photo*</label>
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
              {isLoading ? 'Saving...' : saveMessage ? 'Saved' : 'Save store'}
            </button>
          </div>

          {/* Display backend error */}
          {formError && <p style={{ color: 'red' }}>{formError}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateStore;
