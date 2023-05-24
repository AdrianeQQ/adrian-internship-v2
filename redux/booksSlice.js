import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    save: (state, action) => {
      state.saved = state.saved.filter((book) => book.id !== action.payload.id);
      state.saved.push(action.payload);
    },
    unsave: (state, action) => {
      state.saved = state.saved.filter((book) => book.id !== action.payload.id);
    },
  },
});

export const { save, unsave } = booksSlice.actions;

export default booksSlice.reducer;
