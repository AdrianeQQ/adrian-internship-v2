import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isHamburger: false,
  fontSize: 1,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    openHam: (state) => {
      state.isHamburger = true;
    },
    closeHam: (state) => {
      state.isHamburger = false;
    },
    size: (state, action) => {
      state.fontSize = action.payload;
    },
  },
});

export const { open, close, openHam, closeHam, size } = modalSlice.actions;

export default modalSlice.reducer;
