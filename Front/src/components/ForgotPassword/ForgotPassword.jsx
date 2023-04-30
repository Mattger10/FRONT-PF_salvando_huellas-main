import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    // solicitud al back
    axios
      .put("/users/forgotpass/", { emailU: email })
      .then((res) => res.data)
      .then(() => setMessage("Se envió un correo a tu dirección de email"))
      .catch((error) => {
        console.log(error.message)
        setMessage("Error al enviar solicitud")
    });
  };
  return (
    <div>
        <button type="button" onClick={()=> navigate('/')}>Volver</button>
      <div>
        <h2>Solicitar cambio de contraseña</h2>
        <form onSubmit={handleSubmit}>
          <h3>Se enviará un correo a tu dirección de email</h3>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <button type="submit">Enviar</button>
        </form>
      </div>
      {message.length ?
        (<div >
        <h4>{message}</h4>
        <button onClick={()=>setMessage("")}>Aceptar</button>
        </div>) : ""
      }
    </div>
  );
}
