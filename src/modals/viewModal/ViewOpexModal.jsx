import React from 'react'
import styles from './ViewModal.module.css' // You may want to rename this CSS file as well

function ViewOpexModal({ formData, openEditModal, closeModal }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.formTitle}>View OPEX</h3>
      <div>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <p className={styles.label}>Expense Type</p>
              <p>{formData.expenseType || 'No expense type selected'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Expense Description</p>
              <p>{formData.expenseDescription || 'No description provided'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Amount</p>
              <p>{formData.amount || 'No amount specified'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Note</p>
              <p>{formData.note || 'No notes added'}</p>
            </div>
          </div>

          <div className={styles.formColumn}>
            <div className={styles.formGroup}>
              <p className={styles.label}>Payment Method</p>
              <p>{formData.paymentMethod || 'No payment method selected'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Vendor/Payee (optional)</p>
              <p>{formData.vendor || 'No vendor/payee specified'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Date</p>
              <p>{formData.date || 'No date specified'}</p>
            </div>

            <div className={styles.formGroup}>
              <p className={styles.label}>Image</p>
              <p>{formData.image ? 'Image selected' : 'No image uploaded'}</p>
            </div>
          </div>
        </div>
        <div className={styles.actionContainer}>
          <div className={styles.actionBtn}>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={openEditModal}>Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewOpexModal
