// PaginationDogs.jsx
import React from "react";
import styles from "./PaginationDogs.module.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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
      <button className={styles.button} onClick={handlePrev} disabled={currentPage === 1}><ArrowBackIcon/></button>
      <span className={styles.span}>{currentPage} de {totalPages}</span>
      <button className={styles.button} onClick={handleNext} disabled={currentPage === totalPages}><ArrowForwardIcon/></button>
    </div>
  );
};

export default PaginationDogs;
