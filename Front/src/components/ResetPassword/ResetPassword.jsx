import React, { useState, useEffect } from "react";
import styles from "./ResetPassword.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [passToken, setPassToken] = useState("");
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const loader = <div className={styles.customloader}></div>

  useEffect(() => {
    const querys = new URLSearchParams(location.search);
    const token = querys.get("token");
    if (!token) {
      navigate("/");
    } else setPassToken(token);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // solicitud al back
    setLoading(true)
    if (newPass === confirmNewPass) {
      axios.put('/users/resetpass/1?token='+passToken, {passwordU: newPass}).then(()=> {
        setLoading(false)
        setMessage("Contraseña actualizada!")})
        .catch(error => {
          setLoading(false)
          setMessage("Error al actualizar contraseña")
        })
    } else {
      setLoading(false)
      setMessage("Las contraseñas no coinciden")
    }
  };

  return (
    <div className={styles.container} >
      <div className={styles.container2} >
        <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Reestablecer contraseña</h2>
          <input
          type="password"
            className={styles.input}
            placeholder="Nueva contraseña"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
          ></input>
          <input
          type="password"
            className={styles.input2}
            placeholder="Confirmar contraseña"
            value={confirmNewPass}
            onChange={(e) => setConfirmNewPass(e.target.value)}
            required
          ></input>
          <button 
            className={styles.button}
            type="submit">Confirmar</button>
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
                if (message === "Contraseña actualizada!"){
                  setMessage("")
                  navigate("/")
                } else setMessage("")
              }}
            >
              {message === "Contraseña actualizada!" ? "Iniciar sesión" : "Aceptar"}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
