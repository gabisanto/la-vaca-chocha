import axios from "axios";
import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk("CATEGORIES", () => {
  return axios.get("http://localhost:3001/api/category").then((r) => r.data);
});

const categoriesReducer = createReducer([], {
  [getCategories.fulfilled]: (state, action) => action.payload,
});

export default categoriesReducer;
