import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styles from "./Account.module.css";

const Account = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar el SDK de autenticación de Google
    if (typeof window.gapi !== "undefined") {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            client_id:
              "939538432679-s6j6vrk6uqc5u50didh0kalqelssrog2.apps.googleusercontent.com",
          })
          .then((authInstance) => {
            setAuth(authInstance);
          });
      });
    }

    // Cargar el SDK de Facebook
    window.fbAsyncInit = function () {
      FB.init({
        appId: "1031031684537225",
        cookie: true,
        xfbml: true,
        version: "v12.0",
      });
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleEditingProfile = () => {
    setEditingProfile(!editingProfile);
  };

  const logoutGoogle = () => {
    if (auth !== null) {
      auth.signOut().then(() => {
        console.log("User signed out from Google");
        navigate("/");
      });
    }
  };

  const logoutFacebook = () => {
    FB.logout(function (response) {
      console.log("User signed out from Facebook");
      navigate("/");
    });
  };

  // Ir a funciones de administrador
  const goAdminArticles = () => {
    navigate("/admin/articles");
  };
  const goAdminDogs = () => {
    navigate("/admin/dogs");
  };
  return (
    <div className={styles.darkMode}>
      <div className={styles.container}>
        <h1>Perfil de usuario</h1>
        <button onClick={toggleDarkMode}>
          {darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        </button>
        <button onClick={toggleEditingProfile}>
          {editingProfile ? "Cancelar edición" : "Editar perfil"}
        </button>
        <button onClick={logoutGoogle} className={styles.logoutButton}>
          Cerrar sesión de Google
        </button>
        <button onClick={logoutFacebook} className={styles.logoutButton}>
          Cerrar sesión de Facebook
        </button>
        <h2>Mis donaciones</h2>
        {/*Acá se debería mostrar la lista de donaciones del usuario*/}
        <h2>Mis favoritos</h2>
        {/*Acá se debería mostrar la lista de favoritos del usuario*/}
      </div>

      <div>
        {" "}
        {/* Pendiente renderizado condicional, sólo para admins */}
        <h2>Opciones de Administrador</h2>
        <button onClick={goAdminArticles}>Gestionar Artículos</button>
        <button onClick={goAdminDogs}>Gestionar Perritos</button>
      </div>
    </div>
  );
};

export default Account;
