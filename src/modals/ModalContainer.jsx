import React from 'react'
import style from './ModalContainer.module.css'

const ModalContainer = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeButton} onClick={onClose}>
          x
        </button>
        {content}
      </div>
    </div>
  )
}

export default ModalContainer
