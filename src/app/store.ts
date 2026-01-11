import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import productsReducer from "../features/products/productsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    products: productsReducer,
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
