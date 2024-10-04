import React, { useState } from 'react'
import style from './ImagePicker.module.css'
import { useUploadMutation } from '../../redux/APIs/profilePictureUploadApi'

const ImagePicker = ({ onSelectImage }) => {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [upload, { isLoading, error, data, isSuccess }] = useUploadMutation()

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
      console.log('Upload successful')
      setImageFile(null)
      setImagePreview(null)
    } catch (err) {
      console.error('Error uploading image:', err)
      // Ensure you extract a string from the error to display
      const errorMessage =
        typeof err === 'object'
          ? err.data?.error || err.message || 'An unknown error occurred.'
          : err

      alert(`Upload failed: ${errorMessage}`)
    }
  }

  return (
    <div className={style.container}>
      {isSuccess && <p style={{ color: 'green' }}>{data?.message} 😊</p>}
      {error && (
        <p style={{ color: 'red' }}>
          {error?.data?.msg || 'Error uploading file, please try again'} 😔
        </p>
      )}
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
      {error && (
        <p className={style.error}>
          {typeof error.data === 'object'
            ? JSON.stringify(error.data.message)
            : error.message || 'An error occurred while uploading.'}
        </p>
      )}
    </div>
  )
}

export default ImagePicker
