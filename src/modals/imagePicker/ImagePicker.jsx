import React, { useEffect, useState } from 'react'
import style from './ImagePicker.module.css'
import { useUploadMutation } from '../../redux/APIs/profilePictureUploadApi'

const ImagePicker = ({ onSelectImage, closeModal }) => {
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [upload, { isLoading, error, data, isSuccess }] = useUploadMutation()

  const handleSubmit = async () => {
    if (!imageFile) return

    try {
      const result = await upload(imageFile).unwrap()
      console.log('Upload result:', result)
      setImageFile(null)
      setImagePreview(null)
    } catch (err) {
      console.error('Error uploading image:', err)
      const errorMessage =
        typeof err === 'object'
          ? err.data?.error || err.message || 'An unknown error occurred.'
          : err

      alert(`Upload failed: ${errorMessage}`)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      console.log('Upload was successful:', data)
      const timer = setTimeout(() => {
        closeModal()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, data, closeModal])

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']
      if (!validImageTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, GIF).')
        return
      }

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
        disabled={isLoading}
      />
      <button
        disabled={isLoading || !imageFile}
        className={style.submitButton}
        onClick={handleSubmit}
      >
        {isLoading ? 'Loading...' : 'Ok'}
      </button>
    </div>
  )
}

export default ImagePicker
