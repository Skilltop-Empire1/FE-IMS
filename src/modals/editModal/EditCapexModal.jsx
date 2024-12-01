import React, { useState, useEffect } from 'react'
import styles from './EditModal.module.css'
import { useUpdateCapexMutation } from '../../redux/APIs/accountApi'

const initialData = {
  category: '',
  description: '',
  amount: '',
  dateOfExpense: '',
  expectedLifeSpan: '',
  annualDepreciation: '',
  vendor: '',
  notes: '',
  receipt: null,
}

function EditCapexModal({ closeModal, editData }) {
  const [formData, setFormData] = useState(initialData)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [updateCapex] = useUpdateCapexMutation()

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

      await updateCapex({ data: payload, id: formData.capexId }).unwrap()
      setSuccessMessage('Capital expense updated successfully!')

      setTimeout(() => {
        closeModal()
      }, 2000)
    } catch (err) {
      setErrorMessage('An error occurred while updating the capital expense.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Update Capital Expenses</h3>
      <form onSubmit={handleSubmit}>
        {successMessage && (
          <p className={styles.successText}>{successMessage}</p>
        )}
        {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                Category
              </label>
              <select
                name="category"
                id="category"
                value={formData.category || ''}
                onChange={handleChange}
                className={styles.select}
              >
                <option value="">Select Category</option>
                <option value="equipment">Equipment</option>
                <option value="building">Building</option>
                <option value="vehicle">Vehicle</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description || ''}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Enter description"
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
              <label htmlFor="expectedLifeSpan" className={styles.label}>
                Expected Lifespan (years)
              </label>
              <input
                type="number"
                name="expectedLifeSpan"
                id="expectedLifeSpan"
                value={formData.expectedLifeSpan || ''}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter expected lifespan"
              />
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="annualDepreciation" className={styles.label}>
                Annual Depreciation
              </label>
              <input
                type="number"
                name="annualDepreciation"
                id="annualDepreciation"
                value={formData.annualDepreciation || ''}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter annual depreciation"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="vendor" className={styles.label}>
                Vendor
              </label>
              <input
                type="text"
                name="vendor"
                id="vendor"
                value={formData.vendor || ''}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter vendor name"
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

export default EditCapexModal
