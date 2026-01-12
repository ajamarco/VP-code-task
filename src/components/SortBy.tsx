import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setSortBy, SortOptionValue } from "../features/sort/sortSlice";
import SortByDesktop from "./SortByDesktop";
import SortByMobile from "./SortByMobile";

function SortBy() {
  const dispatch = useAppDispatch();
  const sortBy = useAppSelector((state) => state.sort.sortBy);

  const handleSortChange = (value: SortOptionValue) => {
    dispatch(setSortBy(value));
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg border border-gray-200">
      <SortByDesktop sortBy={sortBy} onSortChange={handleSortChange} />
      <SortByMobile sortBy={sortBy} onSortChange={handleSortChange} />
    </div>
  );
}

export default SortBy;
