import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.success = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = authSlice.actions;

export const login = () => {
  return async (dispatch) => {
    dispatch(loginStart());

    try {
      // Perform API request to authenticate the user
      const url = "http://127.0.0.1:3001/users/login";
      const response = await axios.post(url);

      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export default authSlice.reducer;
