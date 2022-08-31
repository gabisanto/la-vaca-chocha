import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", (data) => {
  return axios
    .post("http://localhost:3001/api/users/login", data)
    .then((res) => res.data.payload);
});

export const sendLogoutRequest = createAsyncThunk("LOGOUT", (cart, thunkAPI) => {
  const { user } = thunkAPI.getState();
  return axios
    .post("http://localhost:3001/api/users/logout", {cart, user})
    .catch((err) => console.log("Something happened", err));
});

const userReducer = createReducer([], {
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fulfilled]: (state, action) => (state = {}),
});

export default userReducer;
