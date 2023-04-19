import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import image from "../../assets/Fondolanding.webp";
import { useAuth0 } from "@auth0/auth0-react";

export default function LandingPage() {

  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0()

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // enviar formulario
    } else {
      // mostrar mensaje de error
    }
  };

 
  return (
    <div>
      <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"></link>
      
      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.register}>
            <h2>Registrarme</h2>
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                className={styles.nombre}
              />
              <input
                type="text"
                placeholder="Email"
                className={styles.correo}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                className={styles.password}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className={styles.showPasswordButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                className={styles.repassword}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <button
                className={styles.showPasswordButton2}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                ></i>
              </button>
              <input
                type="submit"
                className={styles.submit}
                value="REGISTRARME"
              />
              
            </form>
          </div>
          <div className={styles.login}>
            <h2>Iniciar Sesión</h2>
            <div className={styles.loginItems}>
            
            <button onClick={() => loginWithRedirect()} className={styles.google}> ACCEDER CON CUENTA</button>

            <Link to="/home">
            <button className={styles.fb}> ACCEDER COMO INVITADO</button>
            </Link>

             
              {/* <button className={styles.correo}>
                {" "}
                <i className="fas fa-envelope"></i> Ingresar con correo
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
