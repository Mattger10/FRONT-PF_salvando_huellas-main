import React from "react";
import style from "./Trolley.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Trolley() {

    const allArticle = useSelector((state) => state.carrito);

    return (
        <div className={style.container} >

            {allArticle.length === 0 && (
                <div className={style.carritoVacio} >
                    <h4>Tu carrito está vacío ¿No sabés qué comprar?</h4>
                    <Link to="/shop">
                        <button className={style.buttonElegir} >Elegir productos</button>
                    </Link>
                </div>
            )}

            <div>
                {allArticle.map((item, index) => (
                    <div className={style.carritoLleno} key={index}>
                        <img className={style.img} src={item.article.image} alt={'foto de ' + item.article.name} />
                        <p>{item.article.name}</p>
                        <p>$ {item.article.price}</p>
                        <button className={style.button}>eliminar</button>
                    </div>
                ))}
            </div>

            {allArticle.length != 0 && (
                <div className={style.Comprar} >
                    <button>Finalizar Compra</button>
                </div>
            )}
        </div>
    );
}