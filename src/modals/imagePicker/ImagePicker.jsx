import React, { useState } from 'react'
import style from './ImagePicker.module.css'

const ImagePicker = ({ onSelectImage, onSubmit }) => {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setImageFile(file)
      }
      reader.readAsDataURL(file)
      if (onSelectImage) {
        onSelectImage(file)
      }
    }
  }

  const handleSubmit = () => {
    if (imageFile && onSubmit) {
      onSubmit(imageFile)
    }
  }

  return (
    <div className={style.container}>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={style.fileInput}
      />
      {imagePreview && (
        <div className={style.preview}>
          <img
            src={imagePreview}
            alt="Image Preview"
            className={style.previewImage}
          />
        </div>
      )}
      <button className={style.submitButton} onClick={handleSubmit}>
        OK
      </button>
    </div>
  )
}

export default ImagePicker
