// PaginationDogs.jsx
import React from "react";


const PaginationDogs = ({ currentPage, paging, totalPages }) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      paging(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      paging(currentPage + 1);
    }
  };

  return (
    <div >
      <button onClick={handlePrev} disabled={currentPage === 1}>Anterior</button>
      <span>{currentPage} de {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>Siguiente</button>
    </div>
  );
};

export default PaginationDogs;
