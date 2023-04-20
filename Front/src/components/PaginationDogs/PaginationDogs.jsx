// PaginationDogs.jsx
import React from "react";
import styles from "./PaginationDogs.module.css";


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
    <div className={styles.container}>
      <button className={styles.button} onClick={handlePrev} disabled={currentPage === 1}>Anterior</button>
      <span className={styles.span}>{currentPage} de {totalPages}</span>
      <button className={styles.button} onClick={handleNext} disabled={currentPage === totalPages}>Siguiente</button>
    </div>
  );
};

export default PaginationDogs;
