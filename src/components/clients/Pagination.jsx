import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center mt-6 gap-2 text-sm">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Anterior
      </button>

      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 border rounded ${
            idx + 1 === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
        >
          {idx + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
}

export default Pagination;