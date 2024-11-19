import React, { useState } from 'react'
import styles from './AddCapex.module.css' // Make sure to create a separate CSS file for AddCapex

function AddCapex() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    amount: '',
    percentage: '',
    acquisitionDate: '',
    lifeSpan: '',
    depreciationRate: '',
    note: '',
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
      category,
      description,
      amount,
      percentage,
      acquisitionDate,
      lifeSpan,
      depreciationRate,
      image,
    } = formData

    // Check if all required fields are filled
    if (
      !category ||
      !description ||
      !amount ||
      !percentage ||
      !acquisitionDate ||
      !lifeSpan ||
      !depreciationRate ||
      !image
    ) {
      alert('Please fill out all required fields')
      return
    }
    console.log(formData)
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>Add Capital Expenditure (Capex)</h3>
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
              <label htmlFor="percentage" className={styles.label}>
                % of Total Capex
              </label>
              <input
                type="number"
                name="percentage"
                id="percentage"
                value={formData.percentage}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter percentage of total capex"
              />
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <label htmlFor="acquisitionDate" className={styles.label}>
                Acquisition Date
              </label>
              <input
                type="date"
                name="acquisitionDate"
                id="acquisitionDate"
                value={formData.acquisitionDate}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="lifeSpan" className={styles.label}>
                Expected Life Span
              </label>
              <input
                type="text"
                name="lifeSpan"
                id="lifeSpan"
                value={formData.lifeSpan}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter expected life span"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="depreciationRate" className={styles.label}>
                Depreciation Rate
              </label>
              <input
                type="text"
                name="depreciationRate"
                id="depreciationRate"
                value={formData.depreciationRate}
                onChange={handleChange}
                className={styles.input}
                required
                placeholder="Enter depreciation rate"
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
        </div>

        <div>
          <input type="checkbox" />
          <label>Add another CAPEX item</label>
        </div>

        <div className={styles.actionBtns}>
          <button type="button" className={styles.buttonCancel}>
            Cancel
          </button>

          <button type="submit" className={styles.buttonSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCapex
