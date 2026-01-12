import { useAppSelector } from "../hooks/redux";
import PriceFilter from "./PriceFilter";
import BrandFilter from "./BrandFilter";
import ActiveFilters from "./ActiveFilters";

function Filters() {
  const facets = useAppSelector((state) => state.facets.facets);
  console.log("facets", facets);
  // Check if price facet exists
  const hasPriceFacet = facets.some((facet) => facet.identifier === "prices");
  // Check if brand facet exists
  const hasBrandFacet = facets.some((facet) => facet.identifier === "brands");

  return (
    <div className="h-full p-4 border border-gray-200 rounded-lg overflow-y-auto">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <ActiveFilters />
      {hasPriceFacet && <PriceFilter />}
      {hasBrandFacet && <BrandFilter />}
      {!hasPriceFacet && !hasBrandFacet && (
        <p className="text-gray-500">Filter options will be added here</p>
      )}
    </div>
  );
}

export default Filters;
