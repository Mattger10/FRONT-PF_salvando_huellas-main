import styles from "./NavBar.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

// La NavBar se puede convertir en un menú desplegable desde el costado, por ahora está fija arriba

export default function NavBar() {
  const navigate = useNavigate();
  const access = useSelector((state) => state.access);
  const carrito = useSelector((state) => state.carrito);
  const location = useLocation();

  return (
    <div className={styles.nav}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <link rel="stylesheet" href="icons.module.css"></link>
      <Link to="/home">
        <img className={styles.img} src="/img/logo.png" />
      </Link>
      <Link to="/about">
        <button
          className={
            location.pathname === "/about"
              ? styles.selectedButton
              : styles.normalButton
          }
        >
          CONOCENOS
        </button>
      </Link>
     

      {/* <button
        onClick={() => {
          if (access) {
            navigate("/adopt");
          } else {
            navigate("/");
          }
        }}
      > */}

      <button
        className={
          location.pathname === "/adopt"
            ? styles.selectedButton
            : styles.normalButton
        }
        onClick={() => {
          navigate("/adopt");
        }}
      >
        ¿QUERÉS ADOPTAR?
      </button>

      <Link to="/dogs">
        <button
          className={
            location.pathname === "/dogs"
              ? styles.selectedButton
              : styles.normalButton
          }
        >
          PERROS
        </button>
      </Link>
      <Link to="/posts">
        <button
          className={
            location.pathname === "/posts"
              ? styles.selectedButton
              : styles.normalButton
          }
        >
          POSTEOS
        </button>
        </Link>
        <Link to="/shop">
        <button
          className={
            location.pathname === "/shop"
              ? styles.selectedButton
              : styles.normalButton
          }
        >
          TIENDA
        </button>
      </Link>
      <Link to="/donar">
        <button
          className={
            location.pathname === "/donar"
              ? styles.selectedButton
              : styles.normalButton
          }
        >
          DONACIONES!
        </button>
      </Link>
      <Link to="/carrito">
        <div className={styles.cartIcon}>
          <i className="fa fa-shopping-cart"></i>
          <span className={styles.itemCount}>{carrito.length}</span>
        </div>
      </Link>
      <Link to="/account">
        <div className={styles.userIcon}>
          <i className="fa fa-user"></i>
        </div>
      </Link>
    </div>
  );
}
