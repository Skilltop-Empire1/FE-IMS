import { nanoid } from "@reduxjs/toolkit";
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: nanoid(), // generate a unique ID on initial state
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // you can add more reducers if necessary
  },
});

export const selectUserId = (state) => state.user.userId;

export default userSlice.reducer;
