import { SORT_OPTIONS } from "../features/sort/sortSlice";
import { SortProps } from "../types";

function SortByDesktop({ sortBy, onSortChange }: SortProps) {
  return (
    <div className="hidden lg:flex items-center gap-6">
      <span className="font-medium text-gray-700">Sort by:</span>

      {Object.entries(SORT_OPTIONS).map(([label, value]) => (
        <label key={value} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sortBy"
            value={value}
            checked={sortBy === value}
            onChange={() => onSortChange(value)}
            className="cursor-pointer"
          />
          <span className="text-sm">{label}</span>
        </label>
      ))}
    </div>
  );
}

export default SortByDesktop;
