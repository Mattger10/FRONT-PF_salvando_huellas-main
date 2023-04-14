import React from "react";
import style from "./Trolley.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCarrito } from "../../redux/actions";

export default function Trolley() {
  const dispatch = useDispatch();
  const allArticle = useSelector((state) => state.carrito);

  //boton para eliminar elementos del carrito
  const handleDelete = (item) => {
    dispatch(deleteCarrito(item.article.name));
  };

  //agregra articulos del carrito
  function add(name) {
    var quantityElement = document.getElementById(name);
    if (quantityElement) {
      var quantity = parseInt(quantityElement.innerHTML);
      quantity++;
      quantityElement.innerHTML = quantity.toString();
    }
  }

  //restar articulos del carrito 
  function subtract(name) {
    var quantityElement = document.getElementById(name);
    if (quantityElement) {
      var quantity = parseInt(quantityElement.innerHTML);
      if (quantity > 1) {
        quantity--;
        quantityElement.innerHTML = quantity.toString();
      }
    }
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
              <button onClick={() => add(item.article.name)}>+</button>
              <span id={item.article.name}>1</span>
              <button onClick={() => subtract(item.article.name)}>-</button>
            </div>

            <button
              onClick={() => handleDelete(item)}
              className={style.button}
            >
              eliminar
            </button>
          </div>
        ))}
      </div>

      {allArticle.length !== 0 && (
        <div className={style.Comprar}>
          <button>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
}
