import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const sendLoginRequest = createAsyncThunk("LOGIN", (data) => {
  return axios
    .post("http://localhost:3001/api/users/login", data)
    .then((res) => res.data.payload);
});

export const sendLogoutRequest = createAsyncThunk("LOGOUT", (data) => {
  return axios
    .post("http://localhost:3001/api/users/logout", data)
    .catch((err) => console.log("Something happened", err));
});

export const addFavorites = createAsyncThunk("ADD FAVES", (data) => {
  "DATA TIENE QUE SER {USERID: ALGO, PRODUCT: PRODUCT}";
  return axios
    .post("http://localhost:3001/api/users/favorites", data)
    .then(() => {
      let dataReturn = { ...data.product, idProduct: data.product.id };
      return dataReturn;
    })
    .catch((err) => console.log("Something happened", err));
});

export const removeFavorites = createAsyncThunk("REMOVE FAVES", (data) => {
  console.log(data, "esto es data");
  return axios
    .post("http://localhost:3001/api/users/favorites/delete", data)
    .then(() => {
      let dataReturn = { ...data.product, idProduct: data.product.id };
      return dataReturn;
    })
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
});

export default userReducer;
