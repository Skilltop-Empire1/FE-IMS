import { createSlice } from '@reduxjs/toolkit'


const persistedUser = JSON.parse(localStorage.getItem('user'))

const authSlice = createSlice({

  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    id: persistedUser?.id || null,
    email: persistedUser?.email || null,
    role: persistedUser?.role || null,
  },

  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.id = action.payload.id
      state.email = action.payload.email
      state.role = action.payload.role

    },
    logout: (state) => {
      state.token = null;
      state.id = null;
      state.email = null;
      state.role = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    
    setUser: (state, action) => {
      state.user = action.payload

    },
  },
  
})

export const { setCredentials, logout, setUser } = authSlice.actions
export default authSlice.reducer
