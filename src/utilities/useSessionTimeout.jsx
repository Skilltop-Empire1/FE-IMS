import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/slices/AuthSlice'

function useSessionTimeout(timeOutDuration) {
  const dispatch = useDispatch()

  useEffect(() => {
    let timeOut

    const resetTimer = () => {
      if (timeOut) clearTimeout(timeOut)

      timeOut = setTimeout(() => {
        dispatch(logout())
      }, timeOutDuration)
    }

    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keypress', resetTimer)
    resetTimer()

    return () => {
      clearTimeout(timeOut)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keypress', resetTimer)
    }
  }, [dispatch, timeOutDuration])
}

export default useSessionTimeout
