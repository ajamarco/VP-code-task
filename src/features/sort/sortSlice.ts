import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const SORT_OPTIONS = {
  Recommended: 1,
  "Price - Low to High": 2,
  "Price - High to Low": 3,
  "Largest Discount": 4,
} as const;

export type SortOptionValue = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

interface SortState {
  sortBy: SortOptionValue;
}

const initialState: SortState = {
  sortBy: SORT_OPTIONS["Recommended"],
};

const sortSlice = createSlice({
  name: "sort",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<SortOptionValue>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSortBy } = sortSlice.actions;
export default sortSlice.reducer;
