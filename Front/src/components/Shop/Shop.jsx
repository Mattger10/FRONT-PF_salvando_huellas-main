import styles from "./Shop.module.css";
import CardArticle from "../CardArticle/CardArticle";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { getAllArticles } from "../../redux/actions";
import FilterShop from "../FilterShop/FilterShop";
import PaginationDogs from "../PaginationDogs/PaginationDogs";
import React from "react";


export default function Shop() {
  const onSearchArticles = useSelector((state) => state.onSearchArticles);
  const allArticles = useSelector((state) => state.allArticles);

  const dispatch = useDispatch();
//paginado
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(8);
  const indexLastArticle = currentPage * articlesPerPage;
  const indexFirstArticle = indexLastArticle - articlesPerPage;
  const currentArticle = allArticles.slice(indexFirstArticle, indexLastArticle);

  const paging = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
//paginado
  const showArticles = !onSearchArticles.length ? (
    currentArticle.map((art, index) => {
      return (
        <CardArticle
          id={art.id_Article}
          key={index}
          nameA={art.nameA}
          priceA={art.priceA}
          photoA={art.photoA}
          stockA={art.stockA}
        />
      );
    })
  ) : typeof onSearchArticles !== "string" ? (
    onSearchArticles.map((art, index) => {
      return (
        <CardArticle
          id={art.id_Article}
          key={index}
          nameA={art.nameA}
          priceA={art.priceA}
          photoA={art.photoA}
          stockA={art.stockA}
        />
      );
    })
  ) : (
    onSearchArticles
  );

  useEffect(() => {
    dispatch(getAllArticles());
  }, []);

  return (
    <div className={styles.containerGeneral}>
      <div className={styles.huella}>
      <FilterShop setCurrentPage={setCurrentPage} currentArticle={currentArticle}/>
      <div className={styles.shop}>
        <SearchBar />
        <div className={styles.articles}>{showArticles}</div>
        <PaginationDogs
          currentPage={currentPage}
          paging={paging}
          totalPages={totalPages}
        />
      </div>
      </div>
    </div>
  );
}
