import { SORT_OPTIONS, SortOptionValue } from "../features/sort/sortSlice";
import { SortProps } from "../types";

function SortByMobile({ sortBy, onSortChange }: SortProps) {
  return (
    <div className="lg:hidden flex items-center gap-4">
      <label htmlFor="sortBy-select" className="font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sortBy-select"
        value={sortBy}
        onChange={(e) =>
          onSortChange(e.target.value as unknown as SortOptionValue)
        }
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {Object.entries(SORT_OPTIONS).map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortByMobile;
