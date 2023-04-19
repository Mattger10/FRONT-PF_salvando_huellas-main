import React, { useState } from "react";
import { Link, Navigate, Routes, Route, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import image from "../../assets/Fondolanding.webp";

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  const responseGoogle = (response) => {
    if (response.tokenId) {
      setIsLoggedIn(true);
      navigate("/home");
      console.log(response);
    } else {
      console.log(response);
    }
  };

  const responseFacebook = (response) => {
    if (response.accessToken) {
      setIsLoggedIn(false);
      navigate("/home");
      console.log(response);
    } else {
      console.log(response);
    }
  };

  return (
    <div>
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
    className={`fas ${
      showPassword ? "fa-eye-slash" : "fa-eye"
    }`}
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
    className={`fas ${
      showPassword ? "fa-eye-slash" : "fa-eye"
    }`}
  ></i>
</button>
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

              <FacebookLogin
                appId="1031031684537225"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Ingresar con Facebook"
                cssClass={styles.fb}
                icon={<i className="fab fa-facebook-f"></i>}
              />

              <GoogleLogin
                clientId="939538432679-m73jfdv9ko7droctocir7iveuqbeog4l.apps.googleusercontent.com"
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
