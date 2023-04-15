import React, { useState } from "react";
import { Link, Navigate, Routes, Route, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styles from "./LandingPage.module.css";
import image from "../../assets/Fondolanding.webp";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    if (response.tokenId) {
      setIsLoggedIn(false);
      navigate("/home");
      console.log(response);
    } else {
      console.log(response);
    }
  };

  return (
    <div>
      <img src={image} className={styles.img} alt="" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      ></link>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossOrigin="anonymous"
      ></link>

      <div className={styles.container}>
        <div className={styles.loginContainer}>
          <div className={styles.register}>
            <h2>Registrarme</h2>
            <form action="">
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
                type="password"
                placeholder="Contraseña"
                className={styles.password}
              />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                className={styles.repassword}
              />
              <input
                type="submit"
                className={styles.submit}
                value="REGISTRARSE"
              />
              <Link to="/home">
                <input
                  type="submit"
                  className={styles.submit}
                  value="INGRESAR COMO INVITADO"
                />
              </Link>
            </form>
          </div>
          <div className={styles.login}>
            <h2>Iniciar Sesión</h2>
            <div className={styles.loginItems}>
              <button className={styles.fb}>
                <i className="fab fa-facebook-f"></i> Ingresar con Facebook
              </button>

              <GoogleLogin
                clientId="939538432679-s6j6vrk6uqc5u50didh0kalqelssrog2.apps.googleusercontent.com"
                buttonText="Ingresar con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <button className={styles.correo}>
                {" "}
                <i className="fas fa-envelope"></i> Ingresar con correo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
