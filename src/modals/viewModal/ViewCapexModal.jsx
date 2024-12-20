import React from 'react'
import styles from './ViewModal.module.css' // You can reuse the same CSS file

function ViewCapexModal({ formData, openEditModal, onClose }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>View Capital Expenditure</h3>
      <div>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <p className={styles.label}>CAPEX Category</p>
              <p>{formData.category || 'No category selected'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Item/Asset Description</p>
              <p>{formData.description || 'No description provided'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Amount</p>
              <p>{formData.amount || 'No amount specified'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>% of Total Capex</p>
              <p>{formData.percentage || 'No percentage specified'}</p>
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <p className={styles.label}>Acquisition Date</p>
              <p>
                {formData.acquisitionDate || 'No acquisition date specified'}
              </p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Expected Life Span</p>
              <p>{formData.lifeSpan || 'No life span specified'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Depreciation Rate</p>
              <p>
                {formData.depreciationRate || 'No depreciation rate specified'}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.actionContainer}>
          <div className={styles.actionBtn}>
            <button onClick={onClose}>Cancel</button>
            <button onClick={openEditModal}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCapexModal
