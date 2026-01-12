import Filters from "./Filters";
import { OverlayProps } from "../types";

function FilterSidebar({ isOpen, onClose }: OverlayProps) {
  return (
    <div
      className={`
        fixed lg:static top-0 left-0 h-full w-[80%] max-w-75 lg:w-[20%] lg:max-w-none
        transform transition-transform duration-300 ease-in-out z-50 lg:z-auto
        bg-white lg:bg-transparent
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-900"
        aria-label="Close filters"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <Filters />
    </div>
  );
}

export default FilterSidebar;
