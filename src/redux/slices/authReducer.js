import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false,
        user: null, },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated =true;
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
    },
})

export const { setToken, setUser, clearAuth } = authReducer.actions;

export default authReducer.reducer;