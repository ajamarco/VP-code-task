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
      // Find the existing prices and brands facets
      const existingPricesFacet = state.facets.find(
        (facet) => facet.identifier === "prices"
      );
      const existingBrandsFacet = state.facets.find(
        (facet) => facet.identifier === "brands"
      );

      // Check if the new facets include prices and brands
      const newHasPrices = action.payload.some(
        (facet) => facet.identifier === "prices"
      );
      const newHasBrands = action.payload.some(
        (facet) => facet.identifier === "brands"
      );

      // Start with the new facets
      let updatedFacets = [...action.payload];

      // Add back missing facets that should be preserved
      if (existingPricesFacet && !newHasPrices) {
        updatedFacets.push(existingPricesFacet);
      }
      if (existingBrandsFacet && !newHasBrands) {
        updatedFacets.push(existingBrandsFacet);
      }

      state.facets = updatedFacets;
    },
    resetFacets: (state) => {
      state.facets = [];
    },
  },
});

export const { setFacets, setFacetsWithPreservedPrices, resetFacets } =
  facetsSlice.actions;
export default facetsSlice.reducer;
