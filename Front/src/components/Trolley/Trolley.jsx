import React, { useState } from "react";
import style from "./Trolley.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCarrito } from "../../redux/actions";

export default function Trolley() {
    const dispatch = useDispatch();
    const allArticle = useSelector((state) => state.carrito);
    const [quantities, setQuantities] = useState({});

    //boton para eliminar elementos del carrito
    const handleDelete = (item) => {
        dispatch(deleteCarrito(item.article.name));
    };

    // agregar articulos del carrito
    function add(name, price) {
        setQuantities((prevQuantities) => {
          const currentQuantity = prevQuantities[name] || 1;
          const newQuantity = currentQuantity + 1;
          const newPrice = (newQuantity * price).toFixed(2);
          return {
            ...prevQuantities,
            [name]: newQuantity,
            [`${name}_total`]: newPrice,
          };
        });
      }
      

    // restar articulos del carrito
    function subtract(name) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [name]: Math.max((prevQuantities[name] || 1) - 1, 0),
      }));
    }

    //calcular el precio total de un artículo
    function getTotalPrice(item) {
        return (item.article.price * (quantities[item.article.name] || 0)).toFixed(2);
    }

    //calcular el precio total de todos los artículos
    function getTotal() {
        let total = 0;
        allArticle.forEach((item) => {
            total += item.article.price * (quantities[item.article.name] || 0);
        });
        return total.toFixed(2);
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
                            <button onClick={() => subtract(item.article.name)}>-</button>
                            <span>{quantities[item.article.name] || 1}</span>
                            <button onClick={() => add(item.article.name)}>+</button>
                        </div>

                        <p>Total: ${getTotalPrice(item)}</p>

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
