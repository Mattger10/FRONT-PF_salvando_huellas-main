import React, { useState, useEffect } from "react";
import style from "./Trolley.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCarrito, changeCantidad } from "../../redux/actions";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export default function Trolley() {
  const dispatch = useDispatch();
  const allArticle = useSelector((state) => state.carrito);
  const [showPay, setShowPay] = useState(false)

  initMercadoPago("TEST-99c0a5cc-1346-4b33-9653-d582c80c7732");
  const [isReady, setIsReady] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null);


  const handleOnReady = () => {
    setIsReady(true);
  };

  //crear nueva contsante con las propiedades y pasarla ala funcion
    const Article = allArticle.map((art) => {
    return ({
      title: art.article.nameA,
      unit_price: art.article.priceA,
      quantity: Number(art.cantidad),
    }
    );
  });

  const fetchPreferenceId = async () => {
    const response = await axios.post("/payment/purchases", {articles: Article});
    setPreferenceId(response.data.preferenceId);
  };

  useEffect(() => {
    if(allArticle.length){
      fetchPreferenceId()
    };
  }, [allArticle]);

  //boton para eliminar elementos del carrito
  const handleDelete = (item) => {
    dispatch(deleteCarrito(item.article.nameA));
  };

  //calcular el precio total de todos los artículos
  function getTotal() {
    let total = 0;
    allArticle.forEach((item) => {
      total += item.article.priceA * item.cantidad;
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
              src={item.article.photoA}
              alt={"foto de " + item.article.nameA}
            />
            <p>{item.article.nameA}</p>
            <p>$ {item.article.priceA}</p>
            <p>{item.article.stockA} disponibles </p>

            <div>
              <button
                onClick={() => dispatch(changeCantidad(-1, item.article.nameA))}
              >
                -
              </button>
              <span>{item.cantidad}</span>
              <button
                onClick={() => dispatch(changeCantidad(1, item.article.nameA))}
              >
                +
              </button>
            </div>

            <p>Total: ${item.article.priceA * item.cantidad}</p>

            <button onClick={() => handleDelete(item)} className={style.button}>
              eliminar
            </button>
          </div>
        ))}
      </div>

      {allArticle.length !== 0 && (
        <div className={style.Comprar}>
          <p>Total: ${getTotal()}</p>

        </div>
      )}

        {allArticle.length ? <button onClick={()=>{setShowPay(true)}}>Ir a pagar</button> : ""}

        <div className={showPay ? "" : style.hide}>

      {isReady && preferenceId && allArticle.length ? (
        <div>
          <h3>Pagar con Mercado Pago</h3>
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            onReady={handleOnReady}
          />
        </div>
      ) : (
         allArticle.length ?
        <div>Cargando...</div> : "Agrega artículos a tu carrito!"
      )}
      <button onClick={()=>{setShowPay(false)}}>Aceptar</button>

        </div>
    </div>
  );
}
