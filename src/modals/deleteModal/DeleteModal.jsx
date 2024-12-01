import React, { useState } from 'react'
import styles from './DeleteModal.module.css'
import { useDeleteDataMutation } from '../../redux/APIs/accountApi'

function DeleteModal({ closeModal, recordToDelete }) {
  const [deleteData] = useDeleteDataMutation()
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    setSuccessMessage('')
    setErrorMessage('')

    try {
      await deleteData(recordToDelete.expendId).unwrap()
      setSuccessMessage('Expense record deleted successfully!')
      setTimeout(() => {
        closeModal()
      }, 3000)
    } catch (error) {
      setErrorMessage('Error deleting expense record. Please try again.')
      console.error('Error deleting expense record:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.deleteModal}>
      {successMessage && <p className={styles.successText}>{successMessage}</p>}
      {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}
      <p className={styles.deleteMessage}>
        Are you sure you want to delete this {recordToDelete.description}{' '}
        Expense Record?
      </p>
      <div className={styles.modalActions}>
        <button
          onClick={closeModal}
          className={styles.closeBtn}
          disabled={isLoading}
        >
          Close
        </button>
        <button
          onClick={handleDelete}
          className={styles.deleteBtn}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default DeleteModal
