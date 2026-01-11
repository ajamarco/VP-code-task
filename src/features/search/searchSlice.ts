import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
};

const initialState: SearchState = {
  searchQuery: "",
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetSearch: (state) => {
      state.searchQuery = "";
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setSearchQuery, setLoading, setError, resetSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
