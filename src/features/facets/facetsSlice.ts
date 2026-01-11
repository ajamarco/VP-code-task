import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FacetOptionValue {
  gte: number;
  lte: number;
}

interface FacetOption {
  identifier: string;
  value: FacetOptionValue;
  displayValue: string;
  productCount: number;
  priority: number;
}

interface Facet {
  identifier: string;
  facetType: number;
  displayName: string;
  options: FacetOption[];
  priority: number;
}

type FacetsState = {
  facets: Facet[];
};

const initialState: FacetsState = {
  facets: [],
};

const facetsSlice = createSlice({
  name: "facets",
  initialState,
  reducers: {
    setFacets: (state, action: PayloadAction<Facet[]>) => {
      state.facets = action.payload;
    },
    setFacetsWithPreservedPrices: (state, action: PayloadAction<Facet[]>) => {
      // Find the existing prices facet
      const existingPricesFacet = state.facets.find(
        (facet) => facet.identifier === "prices"
      );

      // Check if the new facets include prices
      const newHasPrices = action.payload.some(
        (facet) => facet.identifier === "prices"
      );

      if (existingPricesFacet && !newHasPrices) {
        // Preserve the prices facet if it existed before and is not in the new response
        state.facets = [...action.payload, existingPricesFacet];
      } else {
        state.facets = action.payload;
      }
    },
    resetFacets: (state) => {
      state.facets = [];
    },
  },
});

export const { setFacets, setFacetsWithPreservedPrices, resetFacets } =
  facetsSlice.actions;
export default facetsSlice.reducer;
