import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1,
  pageSize: 20,
  totalItems: 0,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setPaginationData: (
      state,
      action: PayloadAction<{ total: number; size: number; from: number }>
    ) => {
      const { total } = action.payload;
      state.totalItems = total;
      state.pageSize = 20; // Fixed size for requests
      state.totalPages = Math.ceil(total / state.pageSize);
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.totalPages = 1;
      state.totalItems = 0;
    },
  },
});

export const { setCurrentPage, setPaginationData, resetPagination } =
  paginationSlice.actions;
export default paginationSlice.reducer;
