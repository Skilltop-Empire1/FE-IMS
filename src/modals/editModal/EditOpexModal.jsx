import React, { useState, useEffect } from 'react'
import styles from './EditModal.module.css'
import { useUpdateOpexMutation } from '../../redux/APIs/accountApi'

const initialData = {
  expenseType: '',
  paymentMethod: '',
  description: '',
  vendor: '',
  amount: '',
  notes: '',
  dateOfExpense: '',
  receipt: null,
}

function EditOpexModal({ closeModal, editData }) {
  const [formData, setFormData] = useState(initialData)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [updateOpex] = useUpdateOpexMutation()

  // Populate form data with editData on load
  useEffect(() => {
    if (editData) {
      setFormData({ ...initialData, ...editData })
    }
  }, [editData])

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      const payload = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value)
      })

      // Call the API
      await updateOpex({ data: payload, id: formData.expendId }).unwrap()
      setSuccessMessage('Operational expense updated successfully!')

      // Auto-close the modal after success
      setTimeout(() => {
        closeModal()
      }, 2000)
    } catch (err) {
      setErrorMessage('An error occurred while updating the expense.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Update Operational Expenses</h3>
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <p className={styles.successText}>{successMessage}</p>
        )}
        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="expenseType" className={styles.label}>
                Expense Type
              </label>
              <select
                name="expenseType"
                id="expenseType"
                value={formData.expenseType || ''}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select Expense</option>
                <option value="rent">Rent</option>
                <option value="salaries">Salaries</option>
                <option value="utilities">Utilities</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Expense Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description || ''}
                onChange={handleChange}
                className={styles.textarea}
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
                value={formData.amount || ''}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter amount"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.label}>
                Notes
              </label>
              <textarea
                name="notes"
                id="notes"
                value={formData.notes || ''}
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
                value={formData.paymentMethod || ''}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select Payment Method</option>
                <option value="pos">POS</option>
                <option value="transfer">Transfer</option>
                <option value="cash">Cash</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="vendor" className={styles.label}>
                Vendor/Payee
              </label>
              <input
                type="text"
                name="vendor"
                id="vendor"
                value={formData.vendor || ''}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter vendor/payee name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="dateOfExpense" className={styles.label}>
                Date of Expense
              </label>
              <input
                type="date"
                name="dateOfExpense"
                id="dateOfExpense"
                value={formData.dateOfExpense || ''}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="receipt" className={styles.label}>
                Receipt
              </label>
              <input
                type="file"
                name="receipt"
                id="receipt"
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        <div className={styles.actionContainer}>
          <button type="button" onClick={closeModal} className={styles.button}>
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`${styles.button} ${styles.submitButton}`}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditOpexModal
