import SortBy from "./SortBy";
import ProductsList from "./ProductsList";
import Pagination from "./Pagination";

function MainContent() {
  return (
    <div className="w-full lg:w-[80%] flex flex-col">
      <SortBy />
      <ProductsList />
      <Pagination />
    </div>
  );
}

export default MainContent;
