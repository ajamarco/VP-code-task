import { useAppSelector, useAppDispatch } from "../hooks/redux";
import {
  togglePriceFilter,
  toggleBrandFilter,
} from "../features/filters/filtersSlice";
import { SelectedFilter, FilterType } from "../types";

function ActiveFilters() {
  const dispatch = useAppDispatch();
  const selectedPriceFilters = useAppSelector(
    (state) => state.filters.selectedPriceFilters
  );
  const selectedBrandFilters = useAppSelector(
    (state) => state.filters.selectedBrandFilters
  );
  const facets = useAppSelector((state) => state.facets.facets);

  // Find the price and brand facets to get display values
  const priceFacet = facets.find((facet) => facet.identifier === "prices");
  const brandFacet = facets.find((facet) => facet.identifier === "brands");

  // If no active filters, don't render anything
  if (selectedPriceFilters.length === 0 && selectedBrandFilters.length === 0) {
    return null;
  }

  const handleRemoveFilter = (
    filter: SelectedFilter,
    filterType: FilterType
  ) => {
    // Toggle the filter to remove it (same action as unchecking)
    if (filterType === "price") {
      dispatch(togglePriceFilter(filter));
    } else {
      dispatch(toggleBrandFilter(filter));
    }
  };

  const getDisplayValue = (filter: SelectedFilter, filterType: FilterType) => {
    // Otherwise, find the option in the facet to get the display value
    const facet = filterType === "price" ? priceFacet : brandFacet;

    if (facet && filter.identifier) {
      const option = facet.options.find(
        (opt) => opt.identifier === filter.identifier
      );
      if (option) {
        return option.displayValue;
      }
    }

    return `${filter.value.gte} - ${filter.value.lte}`;
  };

  return (
    <div className="mb-4 pb-4 border-b border-gray-200">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Active Filters</h3>
      <div className="space-y-2">
        {selectedPriceFilters.map((filter, index) => (
          <div
            key={filter.identifier || filter.id || `price-${index}`}
            className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md"
          >
            <span className="text-sm text-gray-700">
              <span className="font-medium">Price:</span>{" "}
              {getDisplayValue(filter, "price")}
            </span>
            <button
              onClick={() => handleRemoveFilter(filter, "price")}
              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              aria-label="Remove filter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
        {selectedBrandFilters.map((filter, index) => (
          <div
            key={filter.identifier || filter.id || `brand-${index}`}
            className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-md"
          >
            <span className="text-sm text-gray-700">
              <span className="font-medium">Brand:</span>{" "}
              {getDisplayValue(filter, "brand")}
            </span>
            <button
              onClick={() => handleRemoveFilter(filter, "brand")}
              className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
              aria-label="Remove filter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveFilters;
