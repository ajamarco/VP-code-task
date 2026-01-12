import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setSearchQuery,
  setLoading,
  setError,
} from "../features/search/searchSlice";
import { setProducts } from "../features/products/productsSlice";
import {
  setPaginationData,
  resetPagination,
} from "../features/pagination/paginationSlice";
import {
  setFacets,
  setFacetsWithPreservedPrices,
} from "../features/facets/facetsSlice";
import { useDebounce } from "../hooks/useDebounce";
import { useEffect } from "react";
import { searchAPI } from "../utils/APIs";
import { transformProducts } from "../utils/SearchUtils";

const Search = () => {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const isLoading = useAppSelector((state) => state.search.isLoading);
  const sortBy = useAppSelector((state) => state.sort.sortBy);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const selectedPriceFilters = useAppSelector(
    (state) => state.filters.selectedPriceFilters
  );
  const selectedBrandFilters = useAppSelector(
    (state) => state.filters.selectedBrandFilters
  );
  const dispatch = useAppDispatch();

  // Debounce the search query with 500ms delay
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Reset pagination when search query or sort changes
  useEffect(() => {
    dispatch(resetPagination());
  }, [debouncedSearchQuery, sortBy, dispatch]);

  // Effect to handle API call when debounced value changes (including initial load)
  useEffect(() => {
    const performSearch = async () => {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        // Build facets payload
        const facetsPayload: any = {};
        if (selectedPriceFilters.length > 0) {
          // Format filters for API call
          facetsPayload.prices = selectedPriceFilters.map((filter) => {
            // If it's a range filter (has id and isFilter), use that format
            if (filter.id && filter.isFilter) {
              return {
                isFilter: filter.isFilter,
                id: filter.id,
                value: filter.value,
              };
            }
            // Otherwise, it's a checkbox filter (has identifier)
            return {
              id: filter.identifier,
              value: filter.value,
              displayValue: filter.displayValue,
            };
          });
        }
        if (selectedBrandFilters.length > 0) {
          // Format filters for API call
          facetsPayload.brands = selectedBrandFilters.map((filter) => {
            // If it's a range filter (has id and isFilter), use that format
            if (filter.id && filter.isFilter) {
              return {
                isFilter: filter.isFilter,
                id: filter.id,
                value: filter.value,
              };
            }
            // Otherwise, it's a checkbox filter (has identifier)
            return {
              id: filter.identifier,
              value: filter.value,
              displayValue: filter.displayValue,
            };
          });
        }

        // Determine facetExcludes
        const facetExcludes: string[] = [];
        if (selectedPriceFilters.length > 0) {
          facetExcludes.push("prices");
        }
        if (selectedBrandFilters.length > 0) {
          facetExcludes.push("brands");
        }
        const finalFacetExcludes =
          facetExcludes.length > 0 ? facetExcludes : null;

        const response = await searchAPI(
          debouncedSearchQuery,
          sortBy,
          currentPage,
          facetsPayload,
          finalFacetExcludes
        );

        // Transform and save products to Redux
        if (response.products && Array.isArray(response.products)) {
          const transformedProducts = transformProducts(response.products);
          dispatch(setProducts(transformedProducts));
        }

        // Save pagination data to Redux
        if (response.pagination) {
          dispatch(setPaginationData(response.pagination));
        }

        // Save facets data to Redux with preservation logic
        if (response.facets && Array.isArray(response.facets)) {
          if (
            selectedPriceFilters.length > 0 ||
            selectedBrandFilters.length > 0
          ) {
            // If we have price or brand filters selected, preserve the facets
            dispatch(setFacetsWithPreservedPrices(response.facets));
          } else {
            // No filters selected, just set the facets normally
            dispatch(setFacets(response.facets));
          }
        }

        dispatch(setLoading(false));
      } catch (error) {
        console.error("❌ API call failed:", error);
        dispatch(setError("Search failed. Please try again."));
        dispatch(setProducts([])); // Clear products on error
        dispatch(setLoading(false));
      }
    };

    performSearch();
  }, [
    debouncedSearchQuery,
    sortBy,
    currentPage,
    selectedPriceFilters,
    selectedBrandFilters,
    dispatch,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Type to search..."
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        {isLoading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
