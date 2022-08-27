import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("PRODUCTS", () => {
  return axios.get("http://localhost:3001/api/products").then((r) => r.data);
});

export const createProduct = createAsyncThunk(
  "CREATE PRODUCT",
  (newProduct) => {
    return axios
      .post("http://localhost:3001/api/products", newProduct)
      .then((r) => r.data);
  }
);

const productsReducer = createReducer([], {
  [getProducts.fulfilled]: (state, action) => action.payload,
  [createProduct.fulfilled]: (state, action) => [...state, action.payload],
});

export default productsReducer;
