import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterValue {
  gte: number;
  lte: number;
}

interface SelectedFilter {
  identifier?: string;
  id?: string;
  value: FilterValue;
  displayValue: string;
  isFilter?: boolean;
}

type FiltersState = {
  selectedPriceFilters: SelectedFilter[];
};

const initialState: FiltersState = {
  selectedPriceFilters: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    togglePriceFilter: (state, action: PayloadAction<SelectedFilter>) => {
      // First, check if there's a range filter (id: "pricesRange") and remove it
      const rangeFilterIndex = state.selectedPriceFilters.findIndex(
        (filter) => filter.id === "pricesRange"
      );
      if (rangeFilterIndex !== -1) {
        state.selectedPriceFilters.splice(rangeFilterIndex, 1);
      }

      // Then handle the checkbox toggle
      const index = state.selectedPriceFilters.findIndex(
        (filter) => filter.identifier === action.payload.identifier
      );

      if (index !== -1) {
        // Filter exists, remove it (uncheck)
        state.selectedPriceFilters.splice(index, 1);
      } else {
        // Filter doesn't exist, add it (check)
        state.selectedPriceFilters.push({
          ...action.payload,
        });
      }
    },
    setPriceRangeFilter: (
      state,
      action: PayloadAction<{ gte: number; lte: number }>
    ) => {
      // Clear all filters and set the range filter
      state.selectedPriceFilters = [
        {
          isFilter: true,
          id: "pricesRange",
          value: {
            gte: action.payload.gte,
            lte: action.payload.lte,
          },
          displayValue: "",
        },
      ];
    },
    clearPriceFilters: (state) => {
      state.selectedPriceFilters = [];
    },
  },
});

export const { togglePriceFilter, setPriceRangeFilter, clearPriceFilters } =
  filtersSlice.actions;
export default filtersSlice.reducer;
