import React, { useState, useEffect } from "react";
import styles from "./Article.module.css";
import { addCarrito } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailArticle, getOpinions } from "../../redux/actions";
import Opinions from "../Opinions/Opinions";

export default function DetailsArticle() {
  const detail = useSelector((state) => state.detailArticle);
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useDispatch();

  const { id } = useParams();

  let stockOptions = [];
  for (let i = 0; i < detail.stockA; i++) {
    stockOptions.push(i + 1);
  }

  const handleStockSelect = (e) => {
    setCantidad(e.target.value);
  };

  const handleAdd = (e) => {
    dispatch(
      addCarrito(
        {
          nameA: detail.nameA,
          priceA: detail.priceA,
          photoA: detail.photoA,
          stockA: detail.stockA,
          descriptionA: detail.descriptionA,
        },
        cantidad
      )
    );
  };

  useEffect(() => {
    dispatch(detailArticle(id));
    dispatch(getOpinions());
  }, []);

  return (
    <div>
      <div className={styles.detailsArticle}>
        <div className={styles.detailsLeft}>
          <img
            className={styles.img}
            src={detail.photoA}
            alt={"foto de " + detail.nameA}
          />
        </div>

        <div className={styles.detailsRight}>
          <p>{detail.nameA}</p>
          <p className={styles.price}>$ {detail.priceA}</p>
          <p className={styles.description}>{detail.descriptionA}</p>
          {detail.stockA > 1 ? (
            <p>{detail.stockA} disponibles</p>
          ) : (
            <p>Último disponible!</p>
          )}
          <select onChange={handleStockSelect} className={styles.stockSelect}>
            {stockOptions.map((num, ind) => {
              return <option key={ind}>{num}</option>;
            })}
          </select>
          <button className={styles.button} onClick={handleAdd}>
            Agregar al carrito
          </button>
        </div>
      </div>
      <div>
        <Opinions />
      </div>
    </div>
  );
}