import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SelectedFilter } from "../../types";
import { getLastActiveFilterTypeOnToggle } from "../../utils/FiltersUtils";

type FiltersState = {
  selectedPriceFilters: SelectedFilter[];
  selectedBrandFilters: SelectedFilter[];
  lastActiveFilterType: "prices" | "brands" | null;
};

const initialState: FiltersState = {
  selectedPriceFilters: [],
  selectedBrandFilters: [],
  lastActiveFilterType: null,
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    togglePriceFilter: (state, action: PayloadAction<SelectedFilter>) => {
      // Handle the checkbox toggle
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

      // Update lastActiveFilterType - we just interacted with prices
      state.lastActiveFilterType = getLastActiveFilterTypeOnToggle(
        "prices",
        state.selectedPriceFilters.length,
        state.selectedBrandFilters.length
      );
    },
    clearPriceFilters: (state) => {
      state.selectedPriceFilters = [];
      // Reset lastActiveFilterType if no filters remain
      if (state.selectedBrandFilters.length === 0) {
        state.lastActiveFilterType = null;
      }
    },
    toggleBrandFilter: (state, action: PayloadAction<SelectedFilter>) => {
      // Handle the checkbox toggle
      const index = state.selectedBrandFilters.findIndex(
        (filter) => filter.identifier === action.payload.identifier
      );

      if (index !== -1) {
        // Filter exists, remove it (uncheck)
        state.selectedBrandFilters.splice(index, 1);
      } else {
        // Filter doesn't exist, add it (check)
        state.selectedBrandFilters.push({
          ...action.payload,
        });
      }

      // Update lastActiveFilterType - we just interacted with brands
      state.lastActiveFilterType = getLastActiveFilterTypeOnToggle(
        "brands",
        state.selectedBrandFilters.length,
        state.selectedPriceFilters.length
      );
    },
    clearBrandFilters: (state) => {
      state.selectedBrandFilters = [];
      // Reset lastActiveFilterType if no filters remain
      if (state.selectedPriceFilters.length === 0) {
        state.lastActiveFilterType = null;
      }
    },
  },
});

export const {
  togglePriceFilter,
  clearPriceFilters,
  toggleBrandFilter,
  clearBrandFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
