import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  premium: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {};
    },
    subscription: (state, action) => {
      state.premium = action.payload;
    },
  },
});

export const { login, logout, subscription } = authSlice.actions;

export default authSlice.reducer;
