import React, { useState, useEffect } from "react";
import styles from "./ResetPassword.module.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [passToken, setPassToken] = useState("");

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
    if (newPass === confirmNewPass) {
    }
  };

  return (
    <div className={styles.container} >
      <div className={styles.container2} >
        <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Reestablecer contraseña</h2>
          <input
            className={styles.input}
            placeholder="Nueva contraseña"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          ></input>
          <input
            className={styles.input2}
            placeholder="Confirmar contraseña"
            value={confirmNewPass}
            onChange={(e) => setConfirmNewPass(e.target.value)}
          ></input>
          <button 
            className={styles.button}
            type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
}
