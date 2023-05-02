import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const loader = <div className={styles.customloader}></div>

  const handleSubmit = (e) => {
    e.preventDefault();
    // solicitud al back
    setLoading(true)
    axios
      .put("/users/forgotpass/"+1, { emailU: email })
      .then((res) => res.data)
      .then(() => {
        setLoading(false)
        setMessage("Se envió un correo a tu dirección de email")})
      .catch((error) => {
        console.log(error.message)
        setLoading(false)
        setMessage("Error al enviar solicitud")
    });
  };
  return (
    <div className={styles.container} >
      <div className={styles.container2} >
        <button className={styles.button} type="button" onClick={()=> navigate('/')}>Volver</button>
        <h2>Solicitar cambio de contraseña</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3>Se enviará un correo a tu dirección de email</h3>
          <input
          className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <button className={styles.submitButt} type="submit">Enviar</button>
        </form>

      </div>
      {loading ? <div className={styles.containerMessage}>
          <div className={styles.message}>
            {loader}
          </div>
        </div> : ""}
      {message.length ? (
        <div className={styles.containerMessage}>
          <div className={styles.message}>
            <h3>{message}</h3>
            <button
              className={styles.button}
              onClick={() => {
                setMessage("")
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
