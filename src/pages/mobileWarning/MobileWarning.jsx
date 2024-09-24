import React from 'react'
import styles from './MobileWarning.module.css' // Import the CSS module

function MobileWarning() {
  return (
    <div className={styles.container}>
      <img
        src="https://www.example.com/realistic-image.jpg" // Replace with your own realistic image URL
        alt="Mobile Warning"
        className={styles.image}
      />
      <h1 className={styles.title}>
        Switch to Desktop for the Best Experience
      </h1>
      <p className={styles.message}>
        Our application is optimized for desktop use. To ensure you have the
        best experience, please switch to a desktop computer.
      </p>
      <button className={styles.button}>Learn More</button>
    </div>
  )
}

export default MobileWarning
