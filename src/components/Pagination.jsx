import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function PageButton({ children, onClick, isCurrent = false, disabled = false }) {
  const baseStyles = " flex items-center justify-center rounded-lg border border-gray-300 shadow-sm text-gray-700";
  const activeStyles = isCurrent ? "bg-gray-200 font-bold" : "bg-gray-100 hover:bg-gray-200";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  return (
    <button
      className={`${baseStyles} ${activeStyles} ${disabledStyles} min-w-[3rem] px-2 h-10`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-3 mt-8 mb-4 cursor-pointer">
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <FaChevronLeft className="mr-1" /> Prev
      </PageButton>

      {totalPages > 1 && currentPage !== 1 && (
        <PageButton onClick={() => onPageChange(1)}>1</PageButton>
      )}

      {totalPages > 3 && currentPage > 2 && (
        <span className="text-gray-500">...</span>
      )}

      {currentPage > 2 && (
        <PageButton onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </PageButton>
      )}

      <PageButton isCurrent>{currentPage}</PageButton>

      {currentPage < totalPages - 1 && (
        <PageButton onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </PageButton>
      )}

      {totalPages > 3 && currentPage < totalPages - 1 && (
        <span className="text-gray-500">...</span>
      )}

      {totalPages > 1 && currentPage !== totalPages && (
        <PageButton onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </PageButton>
      )}

      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next <FaChevronRight className="ml-1" />
      </PageButton>
    </div>
  );
}