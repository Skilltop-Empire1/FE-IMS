import React, { createContext, useState, useContext } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState(null)
  const [props, setProps] = useState({}) // Store additional props

  const openModal = (modalContent, modalProps = {}) => {
    console.log('modal is opened')
    setContent(modalContent)
    setProps(modalProps)
    setIsOpen(true)
  }

  // Close the modal
  const closeModal = () => {
    setIsOpen(false)
    setContent(null)
    setProps({})
  }

  return (
    <ModalContext.Provider
      value={{ isOpen, content, props, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
