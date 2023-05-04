import styles from "./Donation.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

export default function Donation() {
  initMercadoPago("TEST-99c0a5cc-1346-4b33-9653-d582c80c7732");
  const [isReady, setIsReady] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null);
  const [price, setPrice] = useState(100);
  const [showPay, setShowPay] = useState(false);
  const loader = <div className={styles.customloader}></div>
  const userLocal = JSON.parse(window.localStorage.getItem("user"))
  const [message, setMessage] = useState("");


  const handlePrice = (e) => {
    let newPrice = Number(e.target.value);
    if (newPrice > 0) {
      setPrice(newPrice);
    } else setPrice()
  };

  const handleOnReady = () => {
    setIsReady(true);
  };

  const fetchPreferenceId = async () => {
    const response = await axios.post("/payment/donations", {
      unit_price: price,
      userId: userLocal.id_User ? userLocal.id_User : undefined
    });
    setPreferenceId(response.data.preferenceId);
  };

  useEffect(() => {
    if(showPay){
      fetchPreferenceId();
    }
  }, [price, showPay]);

  useEffect(()=>{
    const querys = new URLSearchParams(location.search);
    const status = querys.get("status");
    if(status === "success"){
      setMessage("¡Gracias por tu donación!")
    }
  },[])
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>¡TU AYUDA CUENTA!</h1>
      <div className={styles.containerh5}>
        <h5 className={styles.h5}>
      <div className={styles.containerImg}>
          <img className={styles.img} src="/img/Home-dogs11.png" alt="Image 11" />
          <img className={styles.img} src="/img/Home-dogs12.png" alt="Image 12" />
          <img className={styles.img} src="/img/home-dogs13.png" alt="Image 13" />
          <img className={styles.img} src="/img/Home-dogs14.png" alt="Image 14" />  
        </div>
          Donar dinero o insumos de alimentos para perritos en adopción puede
          marcar una gran diferencia en la vida de estos animales necesitados.
          Muchas organizaciones sin fines de lucro dependen de la generosidad de
          la gente para rescatar, cuidar y encontrar hogares amorosos para
          perros abandonados y en situación de calle. Además, adoptar un perro
          puede tener un impacto positivo en la salud mental y física de las
          personas, y ayudar a reducir la sobrepoblación de animales en
          situación de calle. Donar es una manera fácil y efectiva de contribuir
          a la sociedad y mejorar la vida de los perritos en adopción.
        </h5>
      </div>
      
        <div className={styles.donacion}>
          <h4 className={styles.h4}>¿Cuánto quieres donar?</h4>
          <input
            className={styles.input}
            value={price}
            onChange={handlePrice}
            placeholder="Ingrese monto..."
            type="text"
          />
          <button className={styles.button}
            onClick={() => {
              setShowPay(true);
            }}
          >
            Ir a donar
          </button>

          <div className={showPay ? "" : styles.hide}>
          <div className={styles.hide2}>
            <h4 className={styles.h4}>Donar con Mercado Pago</h4>
            {isReady && preferenceId ? (
            <Wallet
              initialization={{ preferenceId: preferenceId }}
              onReady={handleOnReady}
            />
            ) : (
              loader
            )}
            <button className={styles.buttonX}
              onClick={() => {
                setShowPay(false);
              }}
            >
              X
            </button>
            </div>
          </div>
        </div>
        {message.length ? (
        <div className={styles.containerMessage}>
          <div className={styles.message}>
            <h3>{message}</h3>
            <button
              className={styles.button}
              onClick={() => {
                setMessage("");
              }}
            >
              Aceptar
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
