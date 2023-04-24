import React, { useState, useEffect } from "react";
import style from "./Article.module.css";
import { addCarrito } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailArticle, getOpinions } from "../../redux/actions";
import Opinions from "../Opinions/Opinions";

export default function DetailsArticle() {
  const detail = useSelector((state) => state.detailArticle);
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("")

  const { id } = useParams();

  let stockOptions = [];
  for (let i = 0; i < detail.stockA; i++) {
    stockOptions.push(i + 1);
  }

  const handleStockSelect = (e) => {
    setCantidad(e.target.value);
  };

  const handleAdd = (e) => {
    let repeated = false
    const carritoStorage = window.localStorage.getItem('carrito')
    if (carritoStorage){
      JSON.parse(carritoStorage).forEach(artic => {
        if (artic.article.nameA === detail.nameA){
          repeated = true
        }
      }
      );
      if (!repeated){
        dispatch(addCarrito());
        window.localStorage.setItem('carrito', JSON.stringify([...JSON.parse(carritoStorage), {article: {nameA: detail.nameA, priceA: detail.priceA, photoA: detail.photoA, stockA: detail.stockA}, cantidad}]))
        setMessage("Se añadió al carrito")
        setTimeout(()=>{setMessage("")}, 2000)
      } else {
        setMessage("Ya agregaste este artículo")
        setTimeout(()=>{setMessage("")}, 2000)
      }
    } else {
      window.localStorage.setItem('carrito', JSON.stringify([{article: {nameA, priceA, photoA, stockA}, cantidad}]))
    }
  };

  useEffect(() => {
    dispatch(detailArticle(id));
    dispatch(getOpinions());
  }, []);

  return (
    <div>
      <div className={style.detailsArticle}>
        <div className={style.detailsLeft}>
          <img
            className={style.img}
            src={detail.photoA}
            alt={"foto de " + detail.nameA}
          />
        </div>

        <div className={style.detailsRight}>
          <p>{detail.nameA}</p>
          <p className={style.price}>$ {detail.priceA}</p>
          <p className={style.description}>{detail.descriptionA}</p>
          {detail.stockA > 1 ? (
            <p>{detail.stockA} disponibles</p>
          ) : (
            <p>Último disponible!</p>
          )}
          <select onChange={handleStockSelect}>
            {stockOptions.map((num, ind) => {
              return <option key={ind}>{num}</option>;
            })}
          </select>
          <button className={style.button} onClick={handleAdd}>
            Agregar al carrito
          </button>
          {message.length ? <p>{message}</p>: ""}
        </div>
      </div>
      <div>
        <Opinions />
      </div>
    </div>
  );
}
