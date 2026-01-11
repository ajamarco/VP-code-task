import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { toggleBrandFilter } from "../features/filters/filtersSlice";
import { useState } from "react";

function BrandFilter() {
  const dispatch = useAppDispatch();
  const facets = useAppSelector((state) => state.facets.facets);
  const selectedBrandFilters = useAppSelector(
    (state) => state.filters.selectedBrandFilters
  );

  // State to manage which sections are expanded
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    "A-L": false,
    "M-Z": false,
  });

  // Find the brand facet
  const brandFacet = facets.find((facet) => facet.identifier === "brands");

  // If no brand facet or no options, return null
  if (!brandFacet || !brandFacet.options || brandFacet.options.length === 0) {
    return null;
  }

  const handleCheckboxChange = (option: any) => {
    dispatch(
      toggleBrandFilter({
        identifier: option.identifier,
        value: option.value,
        displayValue: "", // Always empty string as per requirements
      })
    );
  };

  const isChecked = (identifier: string) => {
    return selectedBrandFilters.some(
      (filter) => filter.identifier === identifier
    );
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Split brands into A-L and M-Z groups
  const groupBrands = () => {
    const aToL: any[] = [];
    const mToZ: any[] = [];

    brandFacet.options.forEach((option) => {
      const firstLetter = option.displayValue.charAt(0).toUpperCase();
      if (firstLetter >= "A" && firstLetter <= "L") {
        aToL.push(option);
      } else if (firstLetter >= "M" && firstLetter <= "Z") {
        mToZ.push(option);
      } else {
        // For brands starting with numbers or special characters, put in M-Z
        mToZ.push(option);
      }
    });

    return { aToL, mToZ };
  };

  const { aToL, mToZ } = groupBrands();

  const renderBrandOptions = (options: any[]) => {
    return options.map((option) => (
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
    ));
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">{brandFacet.displayName}</h3>
      <div className="space-y-2">
        {/* A to L Section */}
        {aToL.length > 0 && (
          <div className="border border-gray-200 rounded-md">
            <button
              onClick={() => toggleSection("A-L")}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-md"
            >
              <span className="text-sm font-medium text-gray-700">
                A to L ({aToL.length})
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  expandedSections["A-L"] ? "rotate-180" : ""
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
            {expandedSections["A-L"] && (
              <div className="px-3 py-2 space-y-2 max-h-60 overflow-y-auto">
                {renderBrandOptions(aToL)}
              </div>
            )}
          </div>
        )}

        {/* M to Z Section */}
        {mToZ.length > 0 && (
          <div className="border border-gray-200 rounded-md">
            <button
              onClick={() => toggleSection("M-Z")}
              className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-md"
            >
              <span className="text-sm font-medium text-gray-700">
                M to Z ({mToZ.length})
              </span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  expandedSections["M-Z"] ? "rotate-180" : ""
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
            {expandedSections["M-Z"] && (
              <div className="px-3 py-2 space-y-2 max-h-60 overflow-y-auto">
                {renderBrandOptions(mToZ)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandFilter;
