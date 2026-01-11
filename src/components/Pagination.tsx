import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setCurrentPage } from "../features/pagination/paginationSlice";

function Pagination() {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.pagination.currentPage);
  const totalPages = useAppSelector((state) => state.pagination.totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePageClick = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Always show first 5 pages if they exist
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pages.push(i);
    }

    // If current page is beyond the first 5 and not the last page
    if (currentPage > 5 && currentPage < totalPages) {
      // Add ellipsis if there's a gap
      if (currentPage > 6) {
        pages.push("...");
      }
      // Add current page
      pages.push(currentPage);
    }

    // Add ellipsis before last page if needed
    if (totalPages > 6 && currentPage < totalPages - 1) {
      pages.push("...");
    }

    // Add last page if it's not already included
    if (totalPages > 5) {
      pages.push(totalPages);
    }

    // Remove duplicates while maintaining order
    return pages.filter((page, index, self) => self.indexOf(page) === index);
  };

  const pageNumbers = getPageNumbers();

  // Don't show pagination if there's only one page or no pages
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div className="flex gap-1">
        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2">
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handlePageClick(page as number)}
              className={`px-3 py-2 border rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
