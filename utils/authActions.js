import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://127.0.0.1:3001/";

export const registerUser = createAsyncThunk(
  "users/login",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users/login", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
