import React from "react";
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import styles from "./LandingPage.module.css";

export const Profile = () => {
    const {user, isAuthenticated, isLoading } = useAuth0()

    if(isLoading){
        return <div>Cargando...</div>
    }
    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} />
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
            </div>
        )
    )
}

export const LogoutButton = () => {
    const { logout } = useAuth0();

    return <button onClick={() => logout({returnTo: window.location.origin}) }>Logout</button>
}

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button onClick={() => loginWithRedirect()}>Login</button>
}

export default function LandingPage() {

    const { isAuthenticated } = useAuth0();

  return (
    <div>
      <img src="" alt="" />
      <h1>SALVANDO HUELLAS!</h1>
      <input type="text" placeholder="Email" />
      <br />
      <input type="password" placeholder="Contraseña" />
      <br />
      <button className={styles.button}>Ingresar</button>
      <br />
      <button className={styles.button}>Registrarse</button>
      <br />
      <Link to="/home">
      <button className={styles.button}>Ingresar como invitado</button>
      </Link>
      <br />
        {isAuthenticated ? ( 
      <>
        <Profile/>
        <LogoutButton/>
      </>
     ) : ( <LoginButton/>
  )}
    </div>
  );
};
