import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./user";
import cartReducer from "./cart";
import categoriesReducer from "./categories";
import productsReducer from "./products";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  categories: categoriesReducer,
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger).concat(thunk),
});

export const persistor = persistStore(store);
