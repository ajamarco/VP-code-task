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
import { useDebounce } from "../hooks/useDebounce";
import { useEffect } from "react";
import { searchAPI } from "../utils/APIs";
import { transformProducts } from "../utils/SearchUtils";

const Search = () => {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  const isLoading = useAppSelector((state) => state.search.isLoading);
  const sortBy = useAppSelector((state) => state.sort.sortBy);
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
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
        const response = await searchAPI(
          debouncedSearchQuery,
          sortBy,
          currentPage
        );
        console.log("✅ API call successful:", response);

        // Transform and save products to Redux
        if (response.products && Array.isArray(response.products)) {
          const transformedProducts = transformProducts(response.products);
          dispatch(setProducts(transformedProducts));
        }

        // Save pagination data to Redux
        if (response.pagination) {
          dispatch(setPaginationData(response.pagination));
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
  }, [debouncedSearchQuery, sortBy, currentPage, dispatch]);

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
