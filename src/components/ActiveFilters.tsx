import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { togglePriceFilter } from "../features/filters/filtersSlice";

function ActiveFilters() {
  const dispatch = useAppDispatch();
  const selectedPriceFilters = useAppSelector(
    (state) => state.filters.selectedPriceFilters
  );
  const facets = useAppSelector((state) => state.facets.facets);

  // Find the price facet to get display values
  const priceFacet = facets.find((facet) => facet.identifier === "prices");

  // If no active filters, don't render anything
  if (selectedPriceFilters.length === 0) {
    return null;
  }

  const handleRemoveFilter = (filter: any) => {
    // Toggle the filter to remove it (same action as unchecking)
    dispatch(togglePriceFilter(filter));
  };

  const getDisplayValue = (filter: any) => {
    // Otherwise, find the option in the facet to get the display value
    if (priceFacet && filter.identifier) {
      const option = priceFacet.options.find(
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
            key={filter.identifier || filter.id || index}
            className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-md"
          >
            <span className="text-sm text-gray-700">
              <span className="font-medium">Price:</span>{" "}
              {getDisplayValue(filter)}
            </span>
            <button
              onClick={() => handleRemoveFilter(filter)}
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
