import React, { useState } from 'react'
import styles from './EditModal.module.css'

function EditOpexModal({ closeModal }) {
  const [formData, setFormData] = useState({
    expenseType: '',
    paymentMethod: '',
    expenseDescription: '',
    vendor: '',
    amount: '',
    note: '',
    date: '',
    image: null,
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
      expenseType,
      paymentMethod,
      expenseDescription,
      amount,
      date,
      image,
    } = formData
    if (
      !expenseType ||
      !paymentMethod ||
      !expenseDescription ||
      !amount ||
      !date ||
      !image
    ) {
      alert('Please fill out all required fields')
      return
    }
    console.log(formData)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Update Operational Expenses</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="expenseType" className={styles.label}>
                Expense Type
              </label>
              <select
                name="expenseType"
                id="expenseType"
                value={formData.expenseType}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Select Expense</option>
                <option value="rent">Rent</option>
                <option value="salaries">Salaries</option>
                <option value="utilities">Utilities</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="expenseDescription" className={styles.label}>
                Expense Description
              </label>
              <textarea
                name="expenseDescription"
                id="expenseDescription"
                value={formData.expenseDescription}
                onChange={handleChange}
                className={styles.textarea}
                required
                placeholder="Enter expense description"
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
                <option value="cash">Cash</option>
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
              <label htmlFor="date" className={styles.label}>
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.label}>
                Image
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

        <div className={styles.actionContainer}>
          <div className={styles.actionBtn}>
            <button onClick={closeModal}>Cancel</button>
            <button type="submit">Update</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditOpexModal
