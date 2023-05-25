import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saved: [],
  finished: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    save: (state, action) => {
      state.saved = state.saved.filter((book) => book.id !== action.payload.id);
      state.saved.push(action.payload);
    },
    loadSaved: (state, action) => {
      state.saved = action.payload;
    },
    loadFinished: (state, action) => {
      state.finished = action.payload;
    },
    unsave: (state, action) => {
      state.saved = state.saved.filter((book) => book.id !== action.payload.id);
    },
    finish: (state, action) => {
      state.finished = state.finished.filter(
        (book) => book.id !== action.payload.id
      );
      state.finished.push(action.payload);
    },
  },
});

export const { save, unsave, finish, loadSaved, loadFinished } =
  booksSlice.actions;

export default booksSlice.reducer;
