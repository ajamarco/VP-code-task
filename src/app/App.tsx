import Search from "../components/Search";
import ProductsList from "../components/ProductsList";

function App() {
  return (
    <>
      <div className="w-[90%] h-[90vh] mx-auto my-[5vh] p-6 space-y-6">
        <Search />
        <ProductsList />
      </div>
    </>
  );
}

export default App;
