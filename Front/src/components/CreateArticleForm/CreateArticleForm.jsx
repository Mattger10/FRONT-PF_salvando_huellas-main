import styles from "./CreateArticleForm.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { uploadFile } from "../../firebase/config";

export default function CreateArticle() {
  const navigate = useNavigate();
  const [inputData, setInput] = useState({
    nameA: "",
    descriptionA: "",
    stockA: "",
    photoA: "",
    priceA: "",
  });
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await uploadFile(file);
      const response = await axios.post("/articles/register/", {
        ...inputData,
        activeA: true,
        photoA: result,
      });
      setMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userLocal = JSON.parse(window.localStorage.getItem("user"));
    if (!userLocal.isAdminU) {
      navigate("/home");
      
    }
  }, []);

  const userLocal = JSON.parse(window.localStorage.getItem("user"));
  if (!userLocal.isAdminU) {
    return (
      <div>
        <h2>ACCESS DENIED</h2>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>CREAR ARTÍCULO EN LA TIENDA</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nombre:
          <input
            className={styles.input}
            type="text"
            name="nameA"
            onChange={handleInput}
            placeholder="Ingresa un nombre..."
            required
          ></input>
        </label>
        <label className={styles.label}>
          Precio:
          <input
            className={styles.input}
            type="number"
            value={inputData.priceA}
            name="priceA"
            onChange={handleInput}
            placeholder="Ingresa un precio..."
            required
          ></input>
        </label>
        <label className={styles.label}>
          Stock disponible:
          <input
            className={styles.input}
            type="number"
            value={inputData.stockA}
            name="stockA"
            onChange={handleInput}
            placeholder="Ingresa el stock..."
            required
          ></input>
        </label>
        <label className={styles.label}>
          Descripción:
          <textarea
            className={styles.textarea}
            type="text"
            value={inputData.descriptionA}
            name="descriptionA"
            onChange={handleInput}
            placeholder="Ingresa una descripción..."
            required
          ></textarea>
        </label>
        <label className={styles.label}>
          Subir imagen
          <input
            className={styles.input}
            type="file"
            name=""
            id=""
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
          <img
            className={styles.img}
            src={file ? URL.createObjectURL(file) : ""}
          />
        </label>
        <div className={styles.containerButton}>
          <button
            className={styles.button}
            onClick={() => {
              navigate("/admin/articles");
            }}
          >
            VOLVER
          </button>
          <button className={styles.button} type="submit">
            AÑADIR ARTÍCULO
          </button>
        </div>
      </form>
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
