import React, { useState } from 'react';
import { useCreateProductMutation } from '../../redux/productApi';  // Import createProduct mutation hook
import style from './AddProduct.module.css';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('');
  const [alertLimit, setAlertLimit] = useState('');
  const [price, setPrice] = useState('');
  const [productPhoto, setProductPhoto] = useState(null);
  const [addAnother, setAddAnother] = useState(false);

  const [createProduct, { isLoading, error }] = useCreateProductMutation();  // Using the mutation hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('itemCode', itemCode);
    formData.append('description', description);
    formData.append('quantity', quantity);
    formData.append('storeAvailable', storeName);
    formData.append('category', category);
    formData.append('alertStatus', alertLimit);
    formData.append('price', price);
    if (productPhoto) {
      formData.append('photo', productPhoto);
    }

    try {
      await createProduct(formData).unwrap();  // Dispatch the createProduct mutation
      alert('Product created successfully!');
      if (!addAnother) {
        setProductName('');
        setItemCode('');
        setDescription('');
        setQuantity('');
        setStoreName('');
        setCategory('');
        setAlertLimit('');
        setPrice('');
        setProductPhoto(null);
      }
    } catch (err) {
      console.error('Failed to create product:', err);
    }
  };

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
              type="number"
              className={style.input}
              value={itemCode}
              onChange={(e) => setItemCode(e.target.value)}
              required
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
            <label className={style.label}>Quantity:</label>
            <input
              type="number"
              className={style.input}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Stores Available:</label>
            <input
              type="text"
              className={style.input}
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Category:</label>
            <input
              type="text"
              className={style.input}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className={style.cont}>
            <label className={style.label}>Product Alert Limit:</label>
            <input
              type="number"
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
  );
};

export default AddProduct;
