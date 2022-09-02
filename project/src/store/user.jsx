import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", (data) => {
  return axios
    .post("http://localhost:3001/api/users/login", data)
    .then((res) => res.data.payload);
});

export const addFavorites = createAsyncThunk("ADD FAVES", (data) => {
  return axios
    .post("http://localhost:3001/api/users/favorites", data)
    .then(() => {
      let dataReturn = { ...data.product, idProduct: data.product.id };
      return dataReturn;
    })
    .catch((err) => console.log("Something happened", err));
});

export const removeFavorites = createAsyncThunk("REMOVE FAVES", (data) => {
  return axios
    .post("http://localhost:3001/api/users/favorites/delete", data)
    .then(() => {
      let dataReturn = { ...data.product, idProduct: data.product.id };
      return dataReturn;
    });
});

export const sendLogoutRequest = createAsyncThunk(
  "LOGOUT",
  (cart, thunkAPI) => {
    const { user } = thunkAPI.getState();
    return axios
      .post("http://localhost:3001/api/users/logout", { cart, user })
      .catch((err) => console.log("Something happened", err));
  }
);

export const addComment = createAsyncThunk("NEW COMMENT", (data) => {
  return axios
    .post("http://localhost:3001/api/users/comment", data)
    .then((res) => res.data)
    .catch((err) => console.log("Something happened", err));
});

const userReducer = createReducer([], {
  [sendLoginRequest.fulfilled]: (state, action) => action.payload,
  [sendLogoutRequest.fulfilled]: (state, action) => (state = {}),
  [addFavorites.fulfilled]: (state, action) => {
    state.favorites.push(action.payload);
  },
  [removeFavorites.fulfilled]: (state, action) => {
    let newFavorites = state["favorites"].filter(
      (element) => element.idProduct !== action.payload.idProduct
    );
    state.favorites = newFavorites;
  },
  [addComment.fulfilled]: (state, action) => {
    state.comments.push(action.payload);
  },
});

export default userReducer;
