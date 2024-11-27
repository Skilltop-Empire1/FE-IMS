import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AddCapex.module.css' // Make sure to create a separate CSS file for AddCapex
import { useAddCapexMutation } from '../../../../redux/APIs/accountApi'
import Loader from '../../../../components/loaderElement/Loader'

const initialData = {
  category: '',
  description: '',
  amount: '',
  vendor: '',
  dateOfExpense: '',
  expectedLifespan: '',
  annualDepreciation: '',
  notes: '',
  receipt: null,
  type: 'CAPEX',
}

function AddCapex() {
  const [formData, setFormData] = useState(initialData)
  const [preview, setPreview] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [addAnother, setAddAnother] = useState(false)

  const [addCapex, { isLoading, isError, isSuccess }] = useAddCapexMutation()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === 'file') {
      const file = files[0]
      setFormData({ ...formData, [name]: file })
      setPreview(URL.createObjectURL(file))
    } else if (name === 'addAnother') {
      setAddAnother(!addAnother)
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    const { category, description, amount } = formData

    if (!category || !amount || !description) {
      setErrorMessage('Please fill out all required fields.')
      return
    }

    const formDataToSubmit = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value)
    })

    try {
      await addCapex({ data: formDataToSubmit, type: 'OPEX' }).unwrap()
      setSuccessMessage('Operational expense added successfully.')
      setTimeout(() => setSuccessMessage(''), 3000)

      if (addAnother) {
        setFormData(initialData)
        setPreview('')
      } else {
        navigate('/app/accounts/')
      }
    } catch (error) {
      setErrorMessage(error?.data?.message || 'Failed to add expense.')
    }
  }

  // Clean up preview URL when the component unmounts or a new image is uploaded
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {isError && <p className={styles.error}>{errorMessage}</p>}
      {isSuccess && <p className={styles.success}>{successMessage}</p>}
      <h3 className={styles.formTitle}>Add Capital Expenditure (CAPEX)</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                CAPEX Category
              </label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Select Category</option>
                <option value="machine">Machine Purchase</option>
                <option value="building">Building Renovation</option>
                <option value="vehicle">Vehicle Purchase</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Item/Asset Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                required
                placeholder="Enter item or asset description"
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
              <label htmlFor="vendor" className={styles.label}>
                Vendor
              </label>
              <input
                type="text"
                name="vendor"
                id="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className={styles.input}
                required
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
                value={formData.dateOfExpense}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="expectedLifespan" className={styles.label}>
                Expected Lifespan
              </label>
              <input
                type="number"
                name="expectedLifespan"
                id="expectedLifespan"
                value={formData.expectedLifespan}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter Expected Lifespan"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="annualDepreciation" className={styles.label}>
                Depreciation Rate
              </label>
              <input
                type="number"
                name="annualDepreciation"
                id="annualDepreciation"
                value={formData.annualDepreciation}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter depreciation rate"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="notes" className={styles.label}>
                Note
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
              onChange={handleChange}
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

export default AddCapex
