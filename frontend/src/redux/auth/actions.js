import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk("users/login", async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post("http://localhost:3000/users/login", credentials);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
