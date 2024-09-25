import React, { useState } from 'react'
import style from './ImagePicker.module.css'
import { useUploadMutation } from '../../redux/APIs/profilePictureUploadApi'

const ImagePicker = ({ onSelectImage }) => {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [upload, { isLoading, error }] = useUploadMutation()

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setImageFile(file)
        if (onSelectImage) {
          onSelectImage(file)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!imageFile) return
    try {
      await upload(imageFile).unwrap()

      setImageFile(null)
      setImagePreview(null)
    } catch (err) {
      console.error('Error uploading image:', err)
    }
  }

  return (
    <div className={style.container}>
      {imagePreview && (
        <div className={style.preview}>
          <img
            src={imagePreview}
            alt="Image Preview"
            className={style.previewImage}
          />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={style.fileInput}
      />
      <button
        disabled={isLoading}
        className={style.submitButton}
        onClick={handleSubmit}
      >
        {isLoading ? 'Loading...' : 'Ok'}
      </button>
      {error && <p className={style.error}>{error.message}</p>}
    </div>
  )
}

export default ImagePicker
