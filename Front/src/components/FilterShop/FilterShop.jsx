import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchArticlesDesc, ArticlesPriceAsc, ArticlesPriceDesc, getAllArticles } from '../../redux/actions';
import styles from "./FilterShop.module.css";

const FilterShop = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const [sortOption, setSortOption] = useState('');
    const [sortOption2, setSortOption2] = useState('');
  
    const handleChange = (event) => {
      event.preventDefault();
      setCurrentPage(1);
    
      if (sortOption === 'name-desc') {
        dispatch(fetchArticlesDesc());
      }
    
      if (sortOption2 === 'price-asc') {
        dispatch(ArticlesPriceAsc());
      } else if (sortOption2 === 'price-desc') {
        dispatch(ArticlesPriceDesc());
      }
      if (sortOption === '' && sortOption2 === '') {
        dispatch(getAllArticles());
      }

    };
     
    return (
      <div className={styles.filters}>
        <form className={styles.formRow} onSubmit={handleChange}>
          <label className={styles.label} htmlFor="filter-select">Filtrar por:</label>
          <select className={styles.select} id="filter-select" value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
            <option value="default" disabled>
              Elige una opción
            </option>
            <option value="">Todos</option>
            <option value="name-desc">Nombre (Descendente)</option>
          </select>
          <label className={styles.label} htmlFor="filter-select2">Filtrar por precio:</label>
          <select className={styles.select} id="filter-select2" value={sortOption2} onChange={(event) => setSortOption2(event.target.value)}>
            <option value="default" disabled>
              Elige una opción
            </option>
            <option value=''>Todos</option>
            <option value="price-asc">Precio (Ascendente)</option>
            <option value="price-desc">Precio (Descendente)</option>
          </select>
          <button className={styles.buttonFilter} type="submit">Filtrar</button>
        </form>
      </div>
    );
  };
  
export default FilterShop;
