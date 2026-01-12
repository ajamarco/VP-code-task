import { SORT_OPTIONS, SortOptionValue } from "../features/sort/sortSlice";

interface SortByDesktopProps {
  sortBy: SortOptionValue;
  onSortChange: (value: SortOptionValue) => void;
}

function SortByDesktop({ sortBy, onSortChange }: SortByDesktopProps) {
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
