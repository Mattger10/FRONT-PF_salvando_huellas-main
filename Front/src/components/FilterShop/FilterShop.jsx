import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchArticlesDesc, ArticlesPriceAsc, ArticlesPriceDesc, getAllArticles, fetchArticlesAsc } from '../../redux/actions';
import styles from "./FilterShop.module.css";

const FilterShop = ({ setCurrentPage }) => {
    const dispatch = useDispatch();
    const [sortOption, setSortOption] = useState('');
  
    const handleChange = (event) => {
      event.preventDefault();
      setCurrentPage(1);
    
      if (sortOption === 'name-desc') {
        dispatch(fetchArticlesDesc());
      }
      if(sortOption === 'name-asc'){
        dispatch(fetchArticlesAsc())
      }
      if (sortOption === 'price-asc') {
        dispatch(ArticlesPriceAsc());
      } 
      if (sortOption === 'price-desc') {
        dispatch(ArticlesPriceDesc());
      }
      if (sortOption === '') {
        dispatch(getAllArticles());
      }

    };
     
    return (
      <div className={styles.filters}>
        <form className={styles.formRow} onSubmit={handleChange}>
          <label className={styles.label} >Ordenar por:</label>
          <select className={styles.select} id="filter-select" value={sortOption} onChange={(event) => setSortOption(event.target.value)}>
            <option hidden value="">Elegir</option>
            <option disabled>
              Orden alfabético
            </option>
            <option value="name-asc">A a la Z</option>
            <option value="name-desc">Z a la A</option>
            <option disabled>
              Precio
            </option>
            <option value="price-asc">Ascendente</option>
            <option value="price-desc">Descendente</option>
          </select>
          <button className={styles.buttonFilter} type="submit">Ordenar</button>
        </form>
      </div>
    );
  };
  
export default FilterShop;
