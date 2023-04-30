import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.css";
import image from "../../assets/Fondolanding.webp";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import validate from "./validate";

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
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("ERRORS: ",errors)
    if (!Object.keys(errors).length && !Object.keys(validate({name, email, password})).length) {
      // enviar formulario
      try {
        const allUsers = await axios.get("/users");
        if (allUsers) {
          allUsers.data.forEach((u) => {
            if (u.emailU.toLowerCase() === email.toLowerCase()) {
              throw new Error("Ya existe un usuario con ese email");
            }
          });
        }
        console.log({
          name: name.split(" ")[0],
          lastname: name.split(" ")[1],
          email,
          password,
        });
        await axios.post("/users/register", {
          nameU: name.split(" ")[0],
          lastNameU: name.split(" ")[1] || " ",
          passwordU: password,
          idNumbU: Math.round(Math.random() * 100000000), // DNI del usuario, por ahora random
          emailU: email,
          phoneU: "Sin teléfono",
          addressU: "Sin dirección",
          reasonU: "Reason",
        });

        setRegisterMessage("Usuario creado correctamente");
        setTimeout(() => {
          setRegisterMessage("");
        }, 2000);
      } catch (error) {
        console.log(error.message);
        setErrors({ ...errors, axios: error.message });
        setRegisterMessage({
          message: "Error al registrarse",
          styles: {
            position: "fixed",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            padding: "2rem",
            fontSize: "1.2rem",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRight: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }
        });
        setTimeout(() => {
          setRegisterMessage("");
          setErrors({})
        }, 3000);
      }
    } else {
      // mostrar errores validacion formulario

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
        console.log(response.data);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));
        window.localStorage.setItem("token", response.data.token);
        navigate("/home");

      } catch (error) {
        console.error(error);
        setErrors({ ...errors, axios: error.message });
        setErrorMessage({
          message: "Credenciales incorrectas",
          styles: {
            position: "fixed",
            top: "50%",
            right: 0,
            transform: "translateY(-50%)",
            padding: "2rem",
            fontSize: "1.2rem",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRight: "none",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          },
        });
        setTimeout(() => {
          setErrorMessage("");
          setErrors({})
        }, 3000);
      }
    } else {
      // mostrar mensaje de error
    }
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
        crossOrigin="anonymous"
      />

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
                  onChange={(event) => {
                    setName(event.target.value)
                    setErrors(validate({name: event.target.value}))
                  }}
                  required
                />
                <p >{errors.name || ""}</p>
                <input
                  type="text"
                  placeholder="Email"
                  className={styles.correo}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setErrors(validate({email: event.target.value}))
                  }}
                  required
                />
                <p >{errors.email || ""}</p>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  className={styles.password}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value)
                    setErrors(validate({password: event.target.value}))
                  }}
                  required
                />
                <p >{errors.password || ""}</p>
                <button
                  className={styles.showPasswordButton}
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
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
              {registerMessage && (
                <div
                  style={registerMessage.styles}
                >
                  {registerMessage.message}
                </div>
              )}
              
              
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
                  type="button"
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
              {errorMessage && (
                <div
                  style={errorMessage.styles}
                >
                  {errorMessage.message}
                </div>
              )}

              <p
                onClick={() => {
                  navigate('/forgotpass')
                }}
                className={styles.changeForm}
              >
                ¿Olvidaste tu contraseña?
              </p>
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
