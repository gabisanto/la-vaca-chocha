import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk("CATEGORIES", () => {
  return axios.get("http://localhost:3001/api/category").then((r) => r.data);
});

export const createCategory = createAsyncThunk("CREATE CATEGORY", (newCat) => {
  return axios
    .post("http://localhost:3001/api/category", newCat)
    .then((r) => r.data);
});

export const editCategory = createAsyncThunk("EDIT CATEGORY", (data) => {
  console.log("editedProduct", data);
  return axios
    .put(`http://localhost:3001/api/category/${data.id}`, data)
    .then((r) => r.data);
});

export const deleteCategory = createAsyncThunk("DELETE CATEGORY", (data) => {
  let deletedCategory = data;
  return axios
    .delete(`http://localhost:3001/api/category/${deletedCategory.id}`)
    .then(() => deletedCategory);
});

const categoriesReducer = createReducer([], {
  [getCategories.fulfilled]: (state, action) => action.payload,
  [createCategory.fulfilled]: (state, action) => [...state, action.payload],
  [editCategory.fulfilled]: (state, action) => {
    var foundIndex = state.findIndex(
      (product) => product.id === action.payload.id
    );
    state[foundIndex] = action.payload;
  },
  [deleteCategory.fulfilled]: (state, action) =>
    state.filter((category) => category.id !== action.payload.id),
});

export default categoriesReducer;
