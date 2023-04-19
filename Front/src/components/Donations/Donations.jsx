import React, { useContext, useState } from "react";
import style from "./Donation.module.css";
import { Context } from "./context";
import classnames from "classnames";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago("TEST-99c0a5cc-1346-4b33-9653-d582c80c7732");

export default function Donation() {
  const { preferenceId, orderData } = useContext(Context);
  const [isReady, setIsReady] = useState(false);
  const paymentClass = classnames("payment-form dark", {
    "payment-form--hidden": !isReady,
  });

  const handleOnReady = () => {
    setIsReady(true);
  };

  const renderCheckoutButton = (preferenceId) => {
    if (!preferenceId) return null;

    return (
      <div>

        <Wallet
          initialization={{ preferenceId: preferenceId }}
          onReady={handleOnReady}
        />
      </div>
    );
  };

  console.log(preferenceId); // check preferenceId value

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
      {renderCheckoutButton(preferenceId)}
    </div>
  );
}
