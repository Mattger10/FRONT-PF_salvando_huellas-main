import React from "react";
import style from "./Trolley.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Trolley() {

    const allArticle = useSelector((state) => state.carrito);

    return (
        <div className={style.container} >

            {allArticle.length === 0 && (
                <div>
                    <h4>Tu carrito está vacío ¿No sabés qué comprar?</h4>
                    <Link to="/shop">
                        <button>Elegir productos</button>
                    </Link>
                </div>
            )}

            <div>
                {allArticle.map((item, index) => (
                    <div key={index}>
                        <img className={style.img} src={item.article.image} alt={'foto de ' + item.article.name} />
                        <p>{item.article.name}</p>
                        <p>$ {item.article.price}</p>
                        <button className={style.button}>eliminar</button>
                    </div>
                ))}
            </div>

           <div><button>Finalizar Compra</button></div> 

        </div>
    );
}