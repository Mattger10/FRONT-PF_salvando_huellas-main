import React, { useState, useEffect } from "react";
import styles from "./Trolley.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCarrito } from "../../redux/actions";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export default function Trolley() {
  const dispatch = useDispatch();
  const [showPay, setShowPay] = useState(false);
  const [allArticleStorage, setAllArticleStorage] = useState([]);
  initMercadoPago("TEST-99c0a5cc-1346-4b33-9653-d582c80c7732");
  const [isReady, setIsReady] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null);
  const [articleMessage, setArticleMessage] = useState({
    message: "",
    name: "",
  });
  const userLocal = JSON.parse(window.localStorage.getItem("user"));
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const loader = <div className={styles.customloader}></div>

  const handleOnReady = () => {
    setIsReady(true);
  };

  //crear nueva contsante con las propiedades y pasarla ala funcion
  const article = allArticleStorage.map((art) => {
    return {
      title: art.article.nameA,
      unit_price: art.article.priceA,
      quantity: Number(art.cantidad),
    };
  });

  const fetchPreferenceId = async () => {
    const response = await axios.post("/payment/purchases", {
      articles: article,
    });
    setPreferenceId(response.data.preferenceId);
  };

  useEffect(() => {
    if (allArticleStorage.length && showPay) {
      fetchPreferenceId();
    }
  }, [allArticleStorage, showPay]);

  //boton para eliminar elementos del carrito
  const handleDelete = (item) => {
    setArticleMessage({
      message: "Artículo eliminado",
      name: item.article.nameA,
    });
    dispatch(deleteCarrito());
    const aux = [...allArticleStorage].filter(
      (art) => art.article.nameA !== item.article.nameA
    );
    window.localStorage.setItem("carrito", JSON.stringify(aux));
    setAllArticleStorage(aux);
    setTimeout(() => {
      setArticleMessage({ message: "", name: "" });
    }, 1000);
  };

  //calcular el precio total de todos los artículos
  function getTotal() {
    let total = 0;
    allArticleStorage.forEach((item) => {
      total += item.article.priceA * item.cantidad;
    });
    return total;
  }

  useEffect(() => {
    // Si no se creó el storage, lo creo
    if (!window.localStorage.getItem("carrito")) {
      window.localStorage.setItem("carrito", JSON.stringify([]));
    }
  }, []);
  useEffect(() => {
    const aux = JSON.parse(window.localStorage.getItem("carrito"));
    setAllArticleStorage(aux);
  }, []);

  const handleCarritoStorage = (item, num) => {
    //actualizar cantidades en el carrito
    let carritoStorage = JSON.parse(window.localStorage.getItem("carrito"));
    for (let i = 0; i < carritoStorage.length; i++) {
      if (carritoStorage[i].article.nameA === item.article.nameA) {
        carritoStorage[i].cantidad += num;
        if (carritoStorage[i].cantidad < 1) {
          carritoStorage[i].cantidad = 1;
        }
        if (carritoStorage[i].cantidad > item.article.stockA) {
          carritoStorage[i].cantidad = item.article.stockA;
        }
      }
    }
    window.localStorage.setItem("carrito", JSON.stringify(carritoStorage));
    setAllArticleStorage(carritoStorage);
  };
  return (
    <div className={styles.container}>
      {allArticleStorage.length === 0 && (
        <div className={styles.containerCarritoVacio}>
          <div className={styles.carritoVacio}>
            <h4 className={styles.h4}>
              Tu carrito está vacío ¿No sabés qué comprar?
            </h4>
            <div className={styles.containerButton1}>
              <Link to="/shop">
                <button className={styles.buttonElegir}>
                  Elegir productos
                </button>
              </Link>
              <p className={styles.huella}></p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.containerCarritoLleno}>
        {allArticleStorage.map((item, index) => (
          <div className={styles.carritoLleno} key={index}>
            <Link to={`/shop/DetailArticle/${item.article.id_Article}`}>
              <img
                className={styles.img}
                src={item.article.photoA}
                alt={"foto de " + item.article.nameA}
              />
            </Link>
            <p>{item.article.nameA}</p>
            <p>$ {item.article.priceA}</p>
            <p>{item.article.stockA} disponibles </p>
            <p>Total: ${item.article.priceA * item.cantidad}</p>

            <div className={styles.containerButtonsmasymenos}>
              <button
                className={styles.buttonMenos}
                onClick={() => {
                  handleCarritoStorage(item, -1);
                }}
              >
                -
              </button>
              <span className={styles.span}>{item.cantidad}</span>
              <button
                className={styles.buttonMas}
                onClick={() => {
                  handleCarritoStorage(item, 1);
                }}
              >
                +
              </button>
            </div>

            <button
              onClick={() => handleDelete(item)}
              className={styles.buttonEliminar}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
      {articleMessage.message.length ? (
        <div className={styles.span2}>{articleMessage.message}</div>
      ) : (
        ""
      )}

      <div className={styles.Comprar}>
        {allArticleStorage.length !== 0 && (
          <p className={styles.total}>Total: ${getTotal()}</p>
        )}

        {allArticleStorage.length ? (
          <button
            className={styles.buttonPagar}
            onClick={() => {
              setShowPay(true);
            }}
          >
            Pagar
          </button>
        ) : (
          ""
        )}
      </div>

      <div>
        <div className={showPay ? "" : styles.hide}>
          {userLocal.nameU || isAuthenticated ? (
            <div className={styles.hide2}>
              <h3>Pagar con Mercado Pago</h3>
              {isReady && preferenceId ? (
                <Wallet
                  initialization={{ preferenceId: preferenceId }}
                  onReady={handleOnReady}
                />
              ) : (
                loader
              )}

              <button
                className={styles.buttonX}
                onClick={() => {
                  setShowPay(false);
                }}
              >
                X
              </button>
            </div>
          ) : (
            <div className={styles.hide2}>
              <button
                className={styles.buttonX}
                onClick={() => {
                  setShowPay(false);
                }}
              >
                X
              </button>
              <h3>Inicia sesión para continuar con tu compra</h3>
              <button
                onClick={() => {
                  navigate("/");
                }}
              >
                Iniciar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
