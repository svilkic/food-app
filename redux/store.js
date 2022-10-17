import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
// Slices
import cartReducer from "./slices/cartSlice";

const reducers = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
// });
