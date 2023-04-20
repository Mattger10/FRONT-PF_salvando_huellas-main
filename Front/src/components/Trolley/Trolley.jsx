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
    const response = await axios.post("http://localhost:3001/payment/purchases", {articles: Article});
    setPreferenceId(response.data.preferenceId);
  };

  useEffect(() => {
    if(allArticle.length){
      fetchPreferenceId()
    };
    console.log(allArticle)
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

  const [isOpen, setIsOpen] = useState(false); // nuevo estado isOpen

  const handleClose = () => {
    setIsOpen(false);
  };

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

      {isReady && preferenceId && allArticle.length ? (
        <div>
          <Wallet
            initialization={{ preferenceId: preferenceId }}
            onReady={handleOnReady}
          />
        </div>
      ) : (
         allArticle.length &&
        <div>Cargando...</div>
      )}
    </div>
  );
}
