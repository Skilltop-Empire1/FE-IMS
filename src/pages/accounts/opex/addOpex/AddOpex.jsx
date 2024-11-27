import React, { useState } from 'react'
import styles from './AddOpex.module.css'
import { useAddOpexMutation } from '../../../../redux/APIs/accountApi'
import { useNavigate } from 'react-router-dom'
import Loader from '../../../../components/loaderElement/Loader'

function AddOpex() {
  const defaultFormData = {
    category: '',
    paymentMethod: '',
    description: '',
    vendor: '',
    amount: '',
    notes: '',
    dateOfExpense: '',
    receipt: null,
    type: 'OPEX',
  }

  const [addAnother, setAddAnother] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState(defaultFormData)
  const [preview, setPreview] = useState(null)

  const navigate = useNavigate()
  const [addOpex, { isError, isLoading, isSuccess }] = useAddOpexMutation()

  const handleCheckboxChange = () => setAddAnother((prev) => !prev)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] })
      setPreview(URL.createObjectURL(files[0]))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { category, paymentMethod, description, amount, dateOfExpense } =
      formData
    if (
      !category ||
      !paymentMethod ||
      !description ||
      !amount ||
      !dateOfExpense
    ) {
      setErrorMessage('Please fill out all required fields.')
      return
    }

    const formDataToSubmit = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value)
    })

    try {
      await addOpex({ data: formDataToSubmit, type: 'OPEX' }).unwrap()
      setSuccessMessage('Operational expense added successfully.')
      setTimeout(() => setSuccessMessage(''), 3000)

      if (addAnother) {
        setFormData(defaultFormData)
        setPreview(null)
      } else {
        navigate('/app/accounts/')
      }
    } catch (err) {
      setErrorMessage(err?.data?.message || 'Failed to add expense.')
    }
  }

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {isError && <p className={styles.error}>{errorMessage}</p>}
      {isSuccess && <p className={styles.success}>{successMessage}</p>}

      <h3 className={styles.formTitle}>Add Operational Expenses</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                Expense Type
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
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
              <label htmlFor="notes" className={styles.label}>
                notes
              </label>
              <textarea
                name="notes"
                id="notes"
                value={formData.notes}
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
              <label htmlFor="dateOfExpense" className={styles.label}>
                Acquisition Date
              </label>
              <input
                type="date"
                name="dateOfExpense"
                id="dateOfExpense"
                value={formData.dateOfExpense}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="receipt" className={styles.label}>
                receipt
              </label>
              <input
                type="file"
                name="receipt"
                id="receipt"
                onChange={handleChange}
                className={styles.input}
                required
              />
              {preview && (
                <div className={styles.preview}>
                  <img src={preview} alt="Preview" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles.actionButtonContainer}>
          <div className={styles.checkboxGroup}>
            <input
              type="checkbox"
              name="addAnother"
              checked={addAnother}
              onChange={handleCheckboxChange}
            />
            <label>Add another CAPEX item</label>
          </div>

          <div className={styles.actionBtns}>
            <button
              type="button"
              className={styles.buttonCancel}
              onClick={() => navigate('/app/accounts/')}
            >
              Cancel
            </button>

            <button type="submit" className={styles.buttonSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddOpex
