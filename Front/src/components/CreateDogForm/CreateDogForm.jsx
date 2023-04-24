import styles from "./CreateDogForm.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

export default function CreateDog() {
  const navigate = useNavigate();
  const [inputData, setInput] = useState({
    nameD: "",
    historyD: "",
    sexD: "male",
    sizeD: "small",
    photoD: "",
    ageD: "puppy",
  });
  const [message, setMessage] = useState("");

  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/dogs/register", inputData);
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>AÑADE UN PERRO AL REFUGIO</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre:
          <input
            className={styles.input}
            type="text"
            value={inputData.nameD}
            name="nameD"
            onChange={handleInput}
            placeholder="Ingresa un nombre..."
          ></input>
        </label>
        <label className={styles.label}>
          Sexo:
          <select
            className={styles.input}
            type="text"
            value={inputData.sexD}
            name="sexD"
            onChange={handleInput}
            placeholder="Selecciona su sexo..."
          >
            <option value={"male"}>Macho</option>
            <option value={"female"}>Hembra</option>
          </select>
        </label>
        <label className={styles.label}>
          Tamaño:
          <select
            className={styles.input}
            type="text"
            value={inputData.sizeD}
            name="sizeD"
            onChange={handleInput}
            placeholder="Selecciona el tamaño"
          >
            <option value={"small"}>Pequeño</option>
            <option value={"medium"}>Mediano</option>
            <option value={"large"}>Grande</option>
          </select>
        </label>
        <label className={styles.label}>
          Edad:
          <select
            className={styles.input}
            type="text"
            value={inputData.ageD}
            name="ageD"
            onChange={handleInput}
            placeholder="Selecciona edad"
          >
            <option value={"adult"}>Cachorro</option>
            <option value={"puppy"}>Adulto</option>
          </select>
        </label>
        <label className={styles.label}>
          Historia:
          <textarea
            className={styles.textarea}
            type="text"
            value={inputData.historyD}
            name="historyD"
            onChange={handleInput}
            placeholder="Escribe su historia..."
          ></textarea>
        </label>
        <label className={styles.label}>
          Imagen URL:
          <input
            className={styles.input}
            type="url"
            value={inputData.photoD}
            name="photoD"
            onChange={handleInput}
            placeholder="Pega aquí la URL..."
          ></input>
        </label>
        <img className={styles.img} src={inputData.photoD}></img>
        <div className={styles.containerButton}>
        <button
            className={styles.button}
            onClick={() => {
              navigate("/admin/dogs");
            }}
          >
            VOLVER
          </button>
          <button className={styles.button} type="submit">
            AÑADIR PERRO
          </button>
         
        </div>
      </form>
      
      <div className={styles.containerMessage}>
        <div className={message.length ? styles.message : "hide"}>
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
    </div>
  );
}
