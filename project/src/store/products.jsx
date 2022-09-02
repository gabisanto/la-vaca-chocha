import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("PRODUCTS", () => {
  return axios
    .get("http://localhost:3001/api/products")
    .then((r) => r.data.sort((a, b) => a.id - b.id));
});

export const createProduct = createAsyncThunk(
  "CREATE PRODUCT",
  (newProduct) => {
    return axios
      .post("http://localhost:3001/api/products", newProduct)
      .then((r) => r.data);
  }
);

export const editProduct = createAsyncThunk("EDIT PRODUCT", (data) => {
  console.log("editedProduct", data);
  return axios
    .put(`http://localhost:3001/api/products/${data.id}`, data)
    .then((r) => r.data);
});

export const deleteProduct = createAsyncThunk("DELETE PRODUCT", (data) => {
  let deletedProduct = data;
  console.log(data);
  return axios
    .delete(`http://localhost:3001/api/products/${deletedProduct.id}`)
    .then(() => deletedProduct);
});

const productsReducer = createReducer([], {
  [getProducts.fulfilled]: (state, action) => action.payload,
  [createProduct.fulfilled]: (state, action) => [...state, action.payload],
  [editProduct.fulfilled]: (state, action) => {
    var foundIndex = state.findIndex(
      (product) => product.id === action.payload.id
    );
    state[foundIndex] = action.payload;
  },
  [deleteProduct.fulfilled]: (state, action) =>
    state.filter((product) => product.id !== action.payload.id),
});

export default productsReducer;
