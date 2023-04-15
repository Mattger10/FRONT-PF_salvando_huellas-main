import React, { useState } from "react";
import style from "./Trolley.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCarrito, changeCantidad } from "../../redux/actions";

export default function Trolley() {
  const dispatch = useDispatch();
  const allArticle = useSelector((state) => state.carrito);

  //boton para eliminar elementos del carrito
  const handleDelete = (item) => {
    dispatch(deleteCarrito(item.article.name));
  };

  //calcular el precio total de todos los artículos
  function getTotal() {
    let total = 0;
    allArticle.forEach((item) => {
      total += item.article.price * item.cantidad;
    });
    return total;
  }

  return (
    <div className={style.container}>
      {allArticle.length === 0 && (
        <div className={style.carritoVacio}>
          <h4>Tu carrito está vacío ¿No sabés qué comprar?</h4>
          <Link to="/shop">
            <button className={style.buttonElegir}>Elegir productos</button>
          </Link>
        </div>
      )}

      <div>
        {allArticle.map((item, index) => (
          <div className={style.carritoLleno} key={index}>
            <img
              className={style.img}
              src={item.article.image}
              alt={"foto de " + item.article.name}
            />
            <p>{item.article.name}</p>
            <p>$ {item.article.price}</p>
            <div>
              <button
                onClick={() => dispatch(changeCantidad(-1, item.article.name))}
              >
                -
              </button>
              <span>{item.cantidad}</span>
              <button
                onClick={() => dispatch(changeCantidad(1, item.article.name))}
              >
                +
              </button>
            </div>

            <p>Total: ${item.article.price * item.cantidad}</p>

            <button onClick={() => handleDelete(item)} className={style.button}>
              eliminar
            </button>
          </div>
        ))}
      </div>

      {allArticle.length !== 0 && (
        <div className={style.Comprar}>
          <p>Total: ${getTotal()}</p>
          <button>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
}
