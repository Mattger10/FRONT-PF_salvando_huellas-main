import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import image from "../../assets/Fondolanding.webp";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [registerMessage, setRegisterMessage] = useState("");
  const [loginForm, setLoginForm] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      // enviar formulario
      try {
        console.log({name: name.split(" ")[0],lastname: name.split(" ")[1], email, password})
        await axios.post("/users/register", {
          nameU: name.split(" ")[0],
          lastNameU: name.split(" ")[1],
          passwordU: password,
          idNumbU: Math.round(Math.random() * 100000000), // DNI del usuario, por ahora random
          emailU: email,
          phoneU: Math.round(Math.random() * 1000000).toString(),
          addressU: "random street 1",
          reasonU: "Reason",
        });
        
        setRegisterMessage("Usuario creado correctamente");
        setTimeout(() => {
          setRegisterMessage("");
        }, 2000);
      } catch (error) {
        console.log(error.message)
        setErrors({ ...errors, axios: error.message });
        setTimeout(() => {
          setErrors({});
        }, 2000);
        setRegisterMessage("Error al crear usuario");
        setTimeout(() => {
          setRegisterMessage("");
        }, 2000);
      }
    } else {
      // mostrar mensaje de error
    }
  };
  
  const handleLogin = async (event) => {
    event.preventDefault();
    if (!Object.keys(errors).length) {
      try {
        const response = await axios.post("/users/login", {
          emailU: email,
          passwordU: password,
        });
        console.log(response.data)
        navigate("/home");
      } catch (error) {
        setErrors({ ...errors, axios: error.message });
        setRegisterMessage("Credenciales incorrectas");
        setTimeout(() => {
          setRegisterMessage("");
        }, 2000);
      }
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
          {!loginForm && (
            <div className={styles.register}>
              <h2>Registrarme!</h2>
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Nombre y Apellido"
                  className={styles.nombre}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="Email"
                  className={styles.correo}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                  type="submit"
                  className={styles.submit}
                  value="REGISTRARME"
                />
              </form>
              {registerMessage.length ? <h4>{registerMessage}</h4> : ""}
              <p
                onClick={() => {
                  setLoginForm(true);
                }}
                className={styles.changeForm}
              >
                ¿Ya tienes una cuenta? Iniciar sesión
              </p>
            </div>
          )}

          {loginForm && (
            <div className={styles.register}>
              <h2>Mi Salvando Huellas</h2>
              <form action="" onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Email"
                  className={styles.correo}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                  type="submit"
                  className={styles.submit}
                  value="ACCEDER"
                />
              </form>
              {registerMessage.length ? <h4>{registerMessage}</h4> : ""}
              <p
                onClick={() => {
                  setLoginForm(false);
                }}
                className={styles.changeForm}
              >
                Quiero registrarme
              </p>
            </div>
          )}

          <div className={styles.login}>
            <h2>Iniciar Sesión</h2>
            <div className={styles.loginItems}>
              <button
                onClick={() => loginWithRedirect()}
                className={styles.google}
              >
                {" "}
                ACCEDER CON CUENTA
              </button>

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
