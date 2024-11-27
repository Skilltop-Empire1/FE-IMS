import React from 'react'
import { useModal } from '../../context/ModalContext.jsx'
import style from './modal.module.css'

const Modal = () => {
  const { isOpen, content, props, closeModal } = useModal()

  if (!isOpen) return null

  return (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <div className={style.modalHeader}>
          <button onClick={closeModal}>&times;</button>
        </div>
        <div className={style.modalContent}>
          {React.isValidElement(content)
            ? React.cloneElement(content, props)
            : content}
        </div>
      </div>
    </div>
  )
}

export default Modal
