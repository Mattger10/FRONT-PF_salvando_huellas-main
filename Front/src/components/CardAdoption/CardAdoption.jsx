import React from "react";
import styles from "./CardAdoption.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CardAdoption({ adoption, changeStatus }) {
  const [user, setUser] = useState({});
  const [dog, setDog] = useState({});
  useEffect(() => {
    axios
      .get("/users/" + adoption.userId)
      .then((res) => res.data)
      .then((foundUser) => setUser(foundUser))
      .catch((error) => console.error("ERRROR: ", error.message));
    axios
      .get("/dogs/" + adoption.dogId)
      .then((res) => res.data)
      .then((foundDog) => setDog(foundDog))
      .catch((error) => console.error("ERRROR: ", error.message));
  }, []);
  useEffect(() => {
    return () => {
      setUser({});
      setDog({});
    };
  }, []);
  return (
    <div className={styles.containerCard}>
      <div className={styles.userContainer}>
        <h4>{"Solicitud #" + adoption.id_Adoption}</h4>
        <div className={styles.info}>
          <span>{"Usuario: " + user.nameU + " " + user.lastNameU}</span>
          <span>{"Tel. " + user.phoneU}</span>
          <span>{"DNI: " + user.idNumbU}</span>
          <span>{user.emailU}</span>
          <span>{"Perro: " + dog.nameD}</span>
          <span>{"Razón: " + user.reasonU}</span>
          <span>
            {"Tipo de solicitud: " +
              (adoption.adopted_homeA === "adopt"
                ? "Adopción"
                : "Hogar provisorio")}
          </span>
          <span>
            {"Estado: " +
              (adoption.statusA === "accepted"
                ? "Aceptada"
                : adoption.statusA === "rejected"
                ? "Rechazada"
                : "En Revisión")}
          </span>
        </div>
        <div className={styles.userButtons}>
          <button className={styles.button}
            onClick={() => changeStatus("accepted", adoption.id_Adoption)}
          >
            Aceptar Solicitud
          </button>
          <button className={styles.button}
            onClick={() => changeStatus("rejected", adoption.id_Adoption)}
          >
            Rechazar Solicitud
          </button>
        </div>
      </div>
    </div>
  );
}
