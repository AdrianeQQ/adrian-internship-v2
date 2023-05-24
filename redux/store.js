import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";
import booksSlice from "./booksSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    books: booksSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
