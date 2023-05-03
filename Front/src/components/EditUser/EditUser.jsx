import React from "react";
import styles from "./EditUser.module.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function EditUser() {
  const userLocal = JSON.parse(window.localStorage.getItem("user"));
  const [inputData, setInput] = useState({
    nameU: userLocal.nameU,
    lastNameU: userLocal.lastNameU,
    idNumbU: userLocal.idNumbU,
    phoneU: userLocal.phoneU,
    emailU: userLocal.emailU,
    addressU: userLocal.addressU,
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const loader = <div className={styles.customloader}></div>
  const [message, setMessage] = useState("");

  useEffect(()=>{
    if (!userLocal.nameU){
      navigate("/home")
    }
  })

  const handleInput = (e) => {
    setInput({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = () => {
    navigate(`/account`);
  };

  const handleEd = (e) => {
    e.preventDefault();
    let response = confirm("¿Está seguro que quiere dejar de editar?");
    if (response === true) {
      handleEdit();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put("/users/" + userLocal.id_User, {
        ...inputData,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({ ...userLocal, ...inputData })
      );
      setLoading(false);
      setMessage("Tus datos fueron actualizados, " + inputData.nameU + "!");
    } catch (error) {
      setLoading(false);
      setMessage("Error al actualizar datos");
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h2 style={{ fontFamily: "Lemon Days" }} className={styles.h2}>
          Datos Personales
        </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            Nombre:
            <input
              className={styles.input}
              type="text"
              value={inputData.nameU}
              name="nameU"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label className={styles.label}>
            Apellido:
            <input
              className={styles.input}
              type="text"
              value={inputData.lastNameU}
              name="lastNameU"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label className={styles.label}>
            DNI:
            <input
              className={styles.input}
              type="text"
              value={inputData.idNumbU}
              name="idNumbU"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label className={styles.label}>
            Telefono:
            <input
              className={styles.input}
              type="text"
              value={inputData.phoneU}
              name="phoneU"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label className={styles.label}>
            Email:
            <input
              className={styles.input}
              type="text"
              value={inputData.emailU}
              name="emailU"
              onChange={handleInput}
              required
            ></input>
          </label>
          <label className={styles.label}>
            Domicilio:
            <input
              className={styles.input}
              type="text"
              value={inputData.addressU}
              name="addressU"
              onChange={handleInput}
              required
            ></input>
          </label>

          <div className={styles.containerButton}>
            <button className={styles.button} type="button" onClick={handleEd}>
              Cancelar
            </button>
            <button className={styles.button} type="submit">
              APLICAR CAMBIOS
            </button>
          </div>
        </form>
        {loading ? (
          <div className={styles.containerMessage}>
            <div className={styles.message}>{loader}</div>
          </div>
        ) : (
          ""
        )}
        {message.length ? (
          <div className={styles.containerMessage}>
            <div className={styles.message}>
              <h3>{message}</h3>
              <Link to="/account">
                <button
                  className={styles.buttonAceptar}
                  onClick={() => {
                    setMessage("");
                  }}
                >
                  Aceptar
                </button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
