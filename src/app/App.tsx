import { useState } from "react";
import Search from "../components/Search";
import MobileFilterToggle from "../components/MobileFilterToggle";
import FilterOverlay from "../components/FilterOverlay";
import FilterSidebar from "../components/FilterSidebar";
import MainContent from "../components/MainContent";

function App() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <div className="w-[90%] h-[90vh] mx-auto my-[5vh] p-6 space-y-6">
        <div className="flex items-center gap-4">
          <MobileFilterToggle onClick={toggleFilters} />
          <div className="flex-1">
            <Search />
          </div>
        </div>

        <div className="flex gap-6 h-full relative">
          <FilterOverlay isOpen={isFilterOpen} onClose={toggleFilters} />
          <FilterSidebar isOpen={isFilterOpen} onClose={toggleFilters} />
          <MainContent />
        </div>
      </div>
    </>
  );
}

export default App;
