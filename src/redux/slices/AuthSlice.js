import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    id: null,
    email: null,
    role: null,
  },

  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.id = action.payload.id
      state.email = action.payload.email
      state.role = action.payload.role
      localStorage.setItem('token', action.payload.token)
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setCredentials, logout, setUser } = authSlice.actions
export default authSlice.reducer
