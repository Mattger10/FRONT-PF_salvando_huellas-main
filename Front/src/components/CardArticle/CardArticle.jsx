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
  const loader = <div className={styles.customloader}></div>;

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
            {
              article: { nameA, priceA, photoA, stockA, id_Article: id },
              cantidad,
            },
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
          {
            article: { nameA, priceA, photoA, stockA, id_Article: id },
            cantidad,
          },
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

  const handleDel = () => {
    let response = confirm("¿Está seguro que desea eliminar el articulo?");
    if (response === true) {
      handleDelete(id);
    }
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
        {stockA > 1 ? <p>{stockA} disponibles</p> : (stockA === 1 ? <p>Último disponible!</p> : <p>SIN STOCK</p>)}
        <button className={styles.buttonEditar} onClick={handleEdit}>
          Editar
        </button>
        <button
          className={styles.buttonEliminar}
          onClick={() => {
            handleDel();
          }}
        >
          ELIMINAR
        </button>
      </div>
    );
  }

  // ASI SE MUESTRAN EN SHOP
  // return photoA ? (
  //   <div className={styles.card}>
  //     <Link to={`/shop/DetailArticle/${id}`}>
  //       <div onClick={detail}>
  //         <img
  //           src={photoA}
  //           alt={"foto de " + nameA}
  //           className={styles.cardImg}
  //         />
  //       </div>
  //     </Link>
  //     <div className={styles.cardInfo}>
  //       <span className={styles.textTitle}>$ {priceA}</span>
  //     <p className={styles.title}>{nameA?.substring(0, 30) + "..."}</p>
  //     {stockA > 1 ? <p>{stockA} disponibles</p> : <p>Último disponible!</p>}
  //     </div>
  //     <div className={styles.containerButtonsmasymenos}>
  //       <button
  //         className={styles.buttonMenos}
  //         onClick={handleStockSelect}
  //         value={cantidad - 1}
  //       >
  //         -
  //       </button>
  //       <span className={styles.span}>{cantidad}</span>
  //       <button
  //         className={styles.buttonMas}
  //         onClick={handleStockSelect}
  //         value={cantidad + 1}
  //       >
  //         +
  //       </button>
  //     </div>
  //     <button className={styles.button} onClick={handleAdd}>
  //       Agregar al carrito
  //     </button>
  //     {message.length ? <p>{message}</p> : ""}
  //   </div>
  // ) : (
  //   loader
  // );
  return photoA ? (
    <div className={styles.card}>
      <div onClick={detail}>
        <Link to={`/shop/DetailArticle/${id}`}>
          <img
            src={photoA}
            alt={"foto de " + nameA}
            className={styles.cardImg}
          />
        </Link>
      </div>

      <div className={styles.cardInfo}>
        <p className={styles.textTitle}>{nameA?.substring(0, 20) + "..."} </p>
        {stockA > 1 ? (
          <p className={styles.textBody}>{stockA} disponibles</p>
        ) : stockA === 1 ? (
          <p className={styles.textBody}>Último disponible!</p>
        ) : (
          <p className={styles.sinStock}>SIN STOCK</p>
        )}
      </div>
      {stockA > 0 ? <div className={styles.containerButtonsmasymenos}>
        <button
          className={styles.buttonMenos}
          onClick={handleStockSelect}
          value={cantidad - 1}
        >
          -
        </button>
        <span className={styles.span}>{cantidad}</span>
        <button
          className={styles.buttonMas}
          onClick={handleStockSelect}
          value={cantidad + 1}
        >
          +
        </button>
      </div> : ""}

      {stockA > 0 ? <div className={styles.cardFooter}>
        <span className={styles.textTitle}>${priceA}</span>
        <div className={styles.cardButton} onClick={handleAdd}>
          <svg className={styles.svgIcon} viewBox="0 0 20 20">
            <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
            <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
            <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
          </svg>
        </div>
      </div> : ""}
      {message.length ? <p className={styles.message}>{message}</p> : ""}
    </div>
  ) : (
    loader
  );
}
