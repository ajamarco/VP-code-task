import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { togglePriceFilter } from "../features/filters/filtersSlice";
import { useState } from "react";
import { ExpandedSections, FacetOption } from "../types";

function PriceFilter() {
  const dispatch = useAppDispatch();
  const facets = useAppSelector((state) => state.facets.facets);
  const selectedPriceFilters = useAppSelector(
    (state) => state.filters.selectedPriceFilters
  );

  // State to manage which sections are expanded
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    "0-1000": false,
    "1001-2000": false,
    "2001-3000": false,
    "3001-4000": false,
    "4001-5000": false,
    "5000+": false,
  });

  // Find the price facet
  const priceFacet = facets.find((facet) => facet.identifier === "prices");

  // If no price facet or no options, return null
  if (!priceFacet || !priceFacet.options || priceFacet.options.length === 0) {
    return null;
  }

  const handleCheckboxChange = (option: FacetOption) => {
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

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Group prices into ranges based on their gte value
  const groupPrices = () => {
    const ranges: { [key: string]: FacetOption[] } = {
      "0-1000": [],
      "1001-2000": [],
      "2001-3000": [],
      "3001-4000": [],
      "4001-5000": [],
      "5000+": [],
    };

    priceFacet.options.forEach((option) => {
      const minPrice = option.value.gte;

      if (minPrice >= 0 && minPrice <= 1000) {
        ranges["0-1000"].push(option);
      } else if (minPrice >= 1001 && minPrice <= 2000) {
        ranges["1001-2000"].push(option);
      } else if (minPrice >= 2001 && minPrice <= 3000) {
        ranges["2001-3000"].push(option);
      } else if (minPrice >= 3001 && minPrice <= 4000) {
        ranges["3001-4000"].push(option);
      } else if (minPrice >= 4001 && minPrice <= 5000) {
        ranges["4001-5000"].push(option);
      } else {
        ranges["5000+"].push(option);
      }
    });

    return ranges;
  };

  const priceRanges = groupPrices();

  const renderPriceOptions = (options: FacetOption[]) => {
    return options.map((option) => (
      <label
        key={option.identifier}
        className={`flex items-center gap-3 py-1 ${
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
          className="w-5 h-5 lg:w-4 lg:h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <span className="text-base lg:text-sm">
          {option.displayValue} ({option.productCount})
        </span>
      </label>
    ));
  };

  const getRangeLabel = (rangeKey: string) => {
    const labels: { [key: string]: string } = {
      "0-1000": "£0 to £1000",
      "1001-2000": "£1001 to £2000",
      "2001-3000": "£2001 to £3000",
      "3001-4000": "£3001 to £4000",
      "4001-5000": "£4001 to £5000",
      "5000+": "£5000 and above",
    };
    return labels[rangeKey];
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg lg:text-lg font-medium mb-3">
        {priceFacet.displayName}
      </h3>
      <div className="space-y-2">
        {Object.entries(priceRanges).map(([rangeKey, options]) => {
          // Only render sections that have options
          if (options.length === 0) return null;

          return (
            <div key={rangeKey} className="border border-gray-200 rounded-md">
              <button
                onClick={() => toggleSection(rangeKey)}
                className="w-full flex items-center justify-between px-4 py-3 lg:px-3 lg:py-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-md"
              >
                <span className="text-base lg:text-sm font-medium text-gray-700">
                  {getRangeLabel(rangeKey)} ({options.length})
                </span>
                <svg
                  className={`w-6 h-6 lg:w-5 lg:h-5 transition-transform ${
                    expandedSections[rangeKey] ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {expandedSections[rangeKey] && (
                <div className="px-4 py-3 lg:px-3 lg:py-2 space-y-2 max-h-60 overflow-y-auto">
                  {renderPriceOptions(options)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PriceFilter;
