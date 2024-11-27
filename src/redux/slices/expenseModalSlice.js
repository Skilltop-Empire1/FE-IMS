import { createSlice } from "@reduxjs/toolkit";

const expenseModalSlice = createSlice({
    name: "expenseModal",
    initialState: {
        modalProps: {},
    },
    reducers: {
        openModal: (state, action) => {
            state.modalProps = action.payload;
        },
        closeModal: (state) => {
            state.modalProps = {};
        },
    },
});

export const { openModal, closeModal } = expenseModalSlice.actions;
export default expenseModalSlice.reducer;
