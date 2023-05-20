import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
