import style from "./Donation.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";



export default function Donation() {
  initMercadoPago("TEST-99c0a5cc-1346-4b33-9653-d582c80c7732");
  const [isReady, setIsReady] = useState(true);
  const [preferenceId, setPreferenceId] = useState(null);
  const [price, setPrice] = useState(100)

  const handlePrice= (e)=> {
    setPrice(Number(e.target.value));
  }

  const handleOnReady = () => {
    setIsReady(true);
  };

  const fetchPreferenceId = async () => {
    const response = await axios.post("http://localhost:3001/payment/donations", { unit_price:price});
    setPreferenceId(response.data.preferenceId);
  };

  useEffect(() => {
    fetchPreferenceId();
  }, [price]);

  return (
    <div>
      <h1 className={style.title}>SALVANDO HUELLAS!</h1>
      <h5>
        Donar dinero o insumos de alimentos para perritos en adopción puede
        marcar una gran diferencia en la vida de estos animales necesitados.
        Muchas organizaciones sin fines de lucro dependen de la generosidad de la
        gente para rescatar, cuidar y encontrar hogares amorosos para perros
        abandonados y en situación de calle. Además, adoptar un perro puede
        tener un impacto positivo en la salud mental y física de las personas, y
        ayudar a reducir la sobrepoblación de animales en situación de calle.
        Donar es una manera fácil y efectiva de contribuir a la sociedad y
        mejorar la vida de los perritos en adopción.
      </h5>
      {isReady && preferenceId ? (
        <div>
          <input value={price} onChange={handlePrice} type="number" />

          <Wallet
            initialization={{ preferenceId: preferenceId }}
            onReady={handleOnReady}
          />
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
  
}