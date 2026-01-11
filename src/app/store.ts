import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../features/search/searchSlice";
import productsReducer from "../features/products/productsSlice";
import sortReducer from "../features/sort/sortSlice";
import paginationReducer from "../features/pagination/paginationSlice";
import facetsReducer from "../features/facets/facetsSlice";
import filtersReducer from "../features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    products: productsReducer,
    sort: sortReducer,
    pagination: paginationReducer,
    facets: facetsReducer,
    filters: filtersReducer,
  },
});

// Types for TS
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
