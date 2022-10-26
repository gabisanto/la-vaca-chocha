import apiCalls from "../hooks/apiCalls";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk("CATEGORIES", () => {
  return apiCalls.get("/category").then((r) => r.data);
});

export const createCategory = createAsyncThunk("CREATE CATEGORY", (newCat) => {
  return apiCalls.post("/category", newCat).then((r) => r.data);
});

export const editCategory = createAsyncThunk("EDIT CATEGORY", (data) => {
  console.log("editedProduct", data);
  return apiCalls.put(`/category/${data.id}`, data).then((r) => r.data);
});

export const deleteCategory = createAsyncThunk("DELETE CATEGORY", (data) => {
  let deletedCategory = data;
  return apiCalls
    .delete(`/category/${deletedCategory.id}`)
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
