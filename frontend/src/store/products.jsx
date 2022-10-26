import apiCalls from "../hooks/apiCalls";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getProducts = createAsyncThunk("PRODUCTS", () => {
  return apiCalls
    .get("/products")
    .then((r) => r.data.sort((a, b) => a.id - b.id));
});

export const createProduct = createAsyncThunk(
  "CREATE PRODUCT",
  (newProduct) => {
    return apiCalls.post("/products", newProduct).then((r) => r.data);
  }
);

export const editProduct = createAsyncThunk("EDIT PRODUCT", (data) => {
  console.log("editedProduct", data);
  return apiCalls.put(`/products/${data.id}`, data).then((r) => r.data);
});

export const deleteProduct = createAsyncThunk("DELETE PRODUCT", (data) => {
  let deletedProduct = data;
  console.log(data);
  return apiCalls
    .delete(`/products/${deletedProduct.id}`)
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
