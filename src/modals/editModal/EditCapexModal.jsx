import React, { useState } from 'react'
import styles from './EditModal.module.css'

function EditCapexModal({ item, onClose }) {
  const [formData, setFormData] = useState({
    capitalItem: item.capitalItem || '',
    paymentMethod: item.paymentMethod || '',
    description: item.description || '',
    vendor: item.vendor || '',
    amount: item.amount || '',
    note: item.note || '',
    purchaseDate: item.purchaseDate || '',
    image: item.image || null,
  })

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {
      capitalItem,
      paymentMethod,
      description,
      amount,
      purchaseDate,
      image,
    } = formData
    if (
      !capitalItem ||
      !paymentMethod ||
      !description ||
      !amount ||
      !purchaseDate ||
      !image
    ) {
      alert('Please fill out all required fields')
      return
    }
    // Process the updated form data here, such as updating state or making an API call
    console.log(formData)
    onClose() // Close the modal after submission
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Edit Capital Expenditure</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="capitalItem" className={styles.label}>
                Capital Item
              </label>
              <input
                type="text"
                name="capitalItem"
                id="capitalItem"
                value={formData.capitalItem}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter capital item"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                required
                placeholder="Enter item description"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="amount" className={styles.label}>
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={formData.amount}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter amount"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="note" className={styles.label}>
                Note
              </label>
              <textarea
                name="note"
                id="note"
                value={formData.note}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Additional notes or comments"
              />
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="paymentMethod" className={styles.label}>
                Payment Method
              </label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="pos">POS</option>
                <option value="transfer">Transfer</option>
                <option value="loan">Loan</option>
                <option value="leasing">Leasing</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="vendor" className={styles.label}>
                Vendor/Payee (optional)
              </label>
              <input
                type="text"
                name="vendor"
                id="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter vendor/payee name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="purchaseDate" className={styles.label}>
                Purchase Date
              </label>
              <input
                type="date"
                name="purchaseDate"
                id="purchaseDate"
                value={formData.purchaseDate}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.label}>
                Image (Invoice or Receipt)
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={styles.submitButton}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCapexModal
