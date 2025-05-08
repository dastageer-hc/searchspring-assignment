import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-8 mb-4">
      <button
        className="p-2 rounded-lg bg-gray-100 border border-gray-300 shadow-sm text-gray-700 hover:bg-gray-200 disabled:opacity-50 flex items-center"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <FaChevronLeft className="mr-1" /> Prev
      </button>

      <span className="text-gray-700">
        {currentPage} of {totalPages}
      </span>

      {totalPages > 3 && currentPage < totalPages - 1 && (
        <span className="text-gray-500">...</span>
      )}

      {totalPages > 1 && (
        <button
          className="p-2 rounded-lg bg-gray-100 border border-gray-300 shadow-sm text-gray-700 hover:bg-gray-200"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      )}

      <button
        className="p-2 rounded-lg bg-gray-100 border border-gray-300 shadow-sm text-gray-700 hover:bg-gray-200 disabled:opacity-50 flex items-center"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next <FaChevronRight className="ml-1" />
      </button>
    </div>
  );
}