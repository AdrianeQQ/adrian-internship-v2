import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isHamburger: false,
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
  },
});

export const { open, close, openHam, closeHam } = modalSlice.actions;

export default modalSlice.reducer;
