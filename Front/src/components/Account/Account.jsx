import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import styles from "./Account.module.css";



const Account = () => {

    //Estado para almacenar si el usuario está en modo claro u oscuro
    const [darkMode, setDarkMode] = useState(false);

    //Función para cambiar el modo
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    //Estado para almacenar si está editando el perfil
    const [editingProfile, setEditingProfile] = useState(false);

    //Función para cambiar el estado de edición del perfil
    const toggleEditingProfile = () => {
        setEditingProfile(!editingProfile);
    };

    // Estado para guardar el objeto gapi.auth2
    const [auth, setAuth] = useState(null);

     // useNavigate para redirigir al usuario a la página de inicio de sesión
     const navigate = useNavigate();

     

     // Función para cargar el SDK de autenticación de Google
     useEffect(() => {
        if (typeof window.gapi !== 'undefined') {
            window.gapi.load('auth2', () => {
                window.gapi.auth2.init({
                    client_id: "939538432679-s6j6vrk6uqc5u50didh0kalqelssrog2.apps.googleusercontent.com",
                }).then((authInstance) => {
                    setAuth(authInstance);
                });
            });
        }
    }, []);

     // Función para cerrar la sesión de Google
     // Función para cerrar la sesión de Google
const logout = () => {
    if (auth !== null) {
        auth.signOut().then(() => {
            console.log('User signed out');
            navigate("/");
        });
    }
}

    return ( 
        <div>
            <h1>Perfil de usuario</h1>
            <button onClick={toggleDarkMode}>
                {darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            </button>
            <button onClick={toggleEditingProfile}>
                {editingProfile ? 'Cancelar edición' : 'Editar perfil'}
            </button>
            <button onClick={logout} className={styles.logoutButton}>
                Cerrar sesión
            </button>
            <h2>Mis donaciones</h2>
            {/*Acá se debería mostrar la lista de donaciones del usuario*/}
            <h2>Mis favoritos</h2>
            {/*Acá se debería mostrar la lista de favoritos del usuario*/}
        </div>
    )
}


export default Account;