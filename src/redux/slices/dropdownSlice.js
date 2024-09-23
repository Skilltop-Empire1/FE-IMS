import { createSlice } from "@reduxjs/toolkit";


const dropdown = createSlice({
    name: 'dropdown',
    initialState: {
        isOpen: false,
    },
    reducers: {
        toggleDropdown: (state)=> {
            state.isOpen =!state.isOpen;
        },
        showDropdown: (state)=> {
            state.isOpen = true;
        },
        hideDropdown: (state)=> {
            state.isOpen = false;
        },
    },
});

export const { toggleDropdown, showDropdown, hideDropdown } = dropdown.actions;

export default dropdown.reducer;