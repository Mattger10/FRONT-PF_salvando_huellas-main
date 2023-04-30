import styles from "./AdminArticles.module.css";
import CardArticle from "../CardArticle/CardArticle";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllArticles } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function AdminArticles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articles = useSelector((state) => state.allArticles);
  const showArticles = articles.map((art, index) => {
    return (
      <CardArticle
        key={index}
        id={art.id_Article}
        nameA={art.nameA}
        priceA={art.priceA}
        photoA={art.photoA}
        stockA={art.stockA}
      />
    );
  });

  useEffect(() => {
    dispatch(getAllArticles());
  }, []);

  const userLocal = JSON.parse(window.localStorage.getItem("user"));
  if (!userLocal.isAdminU) {
    navigate('/home')
    
  }

  return (
    <div className={styles.containerAll}>
      <div className={styles.containerButtons}>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/account");
          }}
        >
          Volver
        </button>
        <button
          className={styles.button}
          onClick={() => {
            navigate("/admin/articles/create");
          }}
        >
          Añadir un nuevo artículo
        </button>
      </div>
      <div className={styles.container}>
        <h2 className={styles.h2}>GESTIONAR ARTÍCULOS</h2>
        <div className={styles.artListAdmin}>{showArticles}</div>
      </div>
    </div>
  );
}
