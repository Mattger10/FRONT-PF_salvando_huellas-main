import styles from "./CardArticle.module.css";
import { useState } from "react";
import { addCarrito } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { detailArticle, getAllArticles } from "../../redux/actions";
import axios from "axios";
import React from "react";

export default function CardArticle({ nameA, priceA, photoA, stockA, id }) {
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("");

  const detail = () => {
    dispatch(detailArticle(nameA));
  };
  let stockOptions = [];
  for (let i = 0; i < stockA; i++) {
    stockOptions.push(i + 1);
  }

  const handleStockSelect = (e) => {
    let actualCant = Number(e.target.value);
    if (actualCant > 0 && actualCant <= stockA) {
      setCantidad(actualCant);
    }
  };
  const handleAdd = (e) => {
    let repeated = false;
    const carritoStorage = window.localStorage.getItem("carrito");
    if (carritoStorage) {
      JSON.parse(carritoStorage).forEach((artic) => {
        if (artic.article.nameA === nameA) {
          repeated = true;
        }
      });
      if (!repeated) {
        dispatch(addCarrito());
        window.localStorage.setItem(
          "carrito",
          JSON.stringify([
            ...JSON.parse(carritoStorage),
            { article: { nameA, priceA, photoA, stockA }, cantidad },
          ])
        );
        setMessage("Se añadió al carrito");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setMessage("Ya agregaste este artículo");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } else {
      window.localStorage.setItem(
        "carrito",
        JSON.stringify([
          { article: { nameA, priceA, photoA, stockA }, cantidad },
        ])
      );
    }
  };

  // FUNCIONES DE ADMINISTRADOR
  const handleEdit = () => {
    navigate("/admin/articles/" + id);
  };
  const handleDelete = async () => {
    await axios.delete("/articles/delete/" + id);
    dispatch(getAllArticles());
  };

  // ASÍ SE MUESTRAN EN ADMINISTRADOR
  if (location.pathname === "/admin/articles") {
    return (
      <div className={styles.cardArticle2}>
        <img
          src={photoA}
          alt={"foto de " + nameA}
          className={styles.artImage}
        />
        <p>{nameA}</p>
        <p>$ {priceA}</p>
        {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
        <button className={styles.buttonEditar} onClick={handleEdit}>
          Editar
        </button>
        <button className={styles.buttonEliminar} onClick={handleDelete}>
          Eliminar
        </button>
      </div>
    );
  }

  // ASI SE MUESTRAN EN SHOP
  return (
    <div className={styles.cardArticle}>
      <Link to={`/shop/DetailArticle/${id}`}>
        <div onClick={detail}>
          <img
            src={photoA}
            alt={"foto de " + nameA}
            className={styles.artImage}
          />
        </div>
      </Link>
      <p className={styles.title}>{nameA}</p>
      <p>$ {priceA}</p>
      {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
      <div className={styles.containerButtonsmasymenos}>
        <button className={styles.buttonMenos} onClick={handleStockSelect} value={cantidad - 1}>
          -
        </button>
        <span className={styles.span}>{cantidad}</span>
        <button className={styles.buttonMas}onClick={handleStockSelect} value={cantidad + 1}>
          +
        </button>
      </div>
        <button className={styles.button} onClick={handleAdd}>
          Agregar al carrito
        </button>
        {message.length ? <p>{message}</p> : ""}
    </div>
  );
}
