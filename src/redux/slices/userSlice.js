// userSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  userId: nanoid(), // generate a unique ID on initial state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    resetUserId: (state) => {
      state.userId = nanoid();
    },
  },
});

export const { setUserId, resetUserId } = userSlice.actions;
export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer; // Make sure you're exporting the reducer here
