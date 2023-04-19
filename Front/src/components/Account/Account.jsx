import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Account.module.css";

const Account = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [auth, setAuth] = useState(null);

  const toggleEditingProfile = () => {
    setEditingProfile(!editingProfile);
  };

  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  {
    if (isLoading) {
      return <div>Cargando...</div>;
    }
  }

  return (
    <div className={styles.darkMode}>
      <div className={styles.container}>
        <h1>Perfil de usuario</h1>
        {isAuthenticated && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
          </div>
        )}
        <button onClick={toggleEditingProfile}>
          {editingProfile ? "Cancelar edición" : "Editar perfil"}
        </button>
        <button
          onClick={() => logout({ returnTo: "/" })}
          className={styles.logoutButton}
        >
          Cerrar sesión
        </button>

        <h2>Mis donaciones</h2>
        {/*Acá se debería mostrar la lista de donaciones del usuario*/}
        <h2>Mis favoritos</h2>
        {/*Acá se debería mostrar la lista de favoritos del usuario*/}
      </div>
    </div>
  );
};

export default Account;
