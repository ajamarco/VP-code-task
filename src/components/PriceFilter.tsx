import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { togglePriceFilter } from "../features/filters/filtersSlice";

function PriceFilter() {
  const dispatch = useAppDispatch();
  const facets = useAppSelector((state) => state.facets.facets);
  const selectedPriceFilters = useAppSelector(
    (state) => state.filters.selectedPriceFilters
  );

  // Find the price facet
  const priceFacet = facets.find((facet) => facet.identifier === "prices");

  // If no price facet or no options, return null
  if (!priceFacet || !priceFacet.options || priceFacet.options.length === 0) {
    return null;
  }

  const handleCheckboxChange = (option: any) => {
    dispatch(
      togglePriceFilter({
        identifier: option.identifier,
        value: option.value,
        displayValue: "", // Always empty string as per requirements
      })
    );
  };

  const isChecked = (identifier: string) => {
    return selectedPriceFilters.some(
      (filter) => filter.identifier === identifier
    );
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">{priceFacet.displayName}</h3>
      <div className="space-y-2">
        {priceFacet.options.map((option) => (
          <label
            key={option.identifier}
            className={`flex items-center gap-2 ${
              option.productCount === 0
                ? "text-gray-400 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <input
              type="checkbox"
              checked={isChecked(option.identifier)}
              onChange={() => handleCheckboxChange(option)}
              disabled={option.productCount === 0}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <span className="text-sm">
              {option.displayValue} ({option.productCount})
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default PriceFilter;
