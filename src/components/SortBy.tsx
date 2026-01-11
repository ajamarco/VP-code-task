import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  setSortBy,
  SORT_OPTIONS,
  SortOptionValue,
} from "../features/sort/sortSlice";

function SortBy() {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.sort.sortBy);

  const handleSortChange = (value: SortOptionValue) => {
    dispatch(setSortBy(value));
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-6">
        <span className="font-medium text-gray-700">Sort by:</span>

        {Object.entries(SORT_OPTIONS).map(([label, value]) => (
          <label key={value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sortBy"
              value={value}
              checked={sortBy === value}
              onChange={() => handleSortChange(value)}
              className="cursor-pointer"
            />
            <span className="text-sm">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default SortBy;
