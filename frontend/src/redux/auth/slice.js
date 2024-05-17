import { createSlice } from "@reduxjs/toolkit";
import { login } from "./actions";

const userInitialState = [{ email: null, token: null, isLoggedIn: false, error: null }];

export const authSlice = createSlice({
  name: "auth",
  initialState: userInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.user.email;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
