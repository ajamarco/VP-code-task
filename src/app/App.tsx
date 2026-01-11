import Search from "../components/Search";
import ProductsList from "../components/ProductsList";
import Filters from "../components/Filters";
import SortBy from "../components/SortBy";

function App() {
  return (
    <>
      <div className="w-[90%] h-[90vh] mx-auto my-[5vh] p-6 space-y-6">
        <Search />
        <div className="flex gap-6 h-full">
          <div className="w-[20%]">
            <Filters />
          </div>
          <div className="w-[80%] flex flex-col">
            <SortBy />
            <ProductsList />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
