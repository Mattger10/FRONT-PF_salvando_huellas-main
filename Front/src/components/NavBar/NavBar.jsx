import styles from "./NavBar.module.css";
import style from "./Darckmode.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { changeCantidad } from "../../redux/actions";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// La NavBar se puede convertir en un menú desplegable desde el costado, por ahora está fija arriba

export default function NavBar() {
  const navigate = useNavigate();
  const access = useSelector((state) => state.access);
  const carrito = useSelector((state) => state.carrito);
  const location = useLocation();
  const dispatch = useDispatch()
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const carritoStorage = JSON.parse(window.localStorage.getItem('carrito'))
    if (carritoStorage) {
      dispatch(changeCantidad(carritoStorage.length))
    }

    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className={styles.container}>
      <div className={`${styles.nav} ${darkMode ? style.DarckMode : ''}`}>
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
            className={`${location.pathname === "/about"
                ? styles.selectedButton
                : styles.normalButton} && ${darkMode ? style.DarckMode : ''}`
            }
          >
            CONOCENOS
          </button>
        </Link>

        <button
          className={`${location.pathname === "/adopt"
              ? styles.selectedButton
              : styles.normalButton} && ${darkMode ? style.DarckMode : ''}`
          }
          onClick={() => {
            navigate("/adopt");
          }}
        >
          ¿QUERÉS ADOPTAR?
        </button>

        <Link to="/dogs">
          <button
            className={`${location.pathname === "/dogs"
                ? styles.selectedButton
                : styles.normalButton} && ${darkMode ? style.DarckMode : ''}`
            }
          >
            PERROS
          </button>
        </Link>
        <Link to="/posts">
          <button
            className={`${location.pathname === "/posts"
                ? styles.selectedButton
                : styles.normalButton} && ${darkMode ? style.DarckMode : ''}`
            }
          >
            POSTEOS
          </button>
        </Link>
        <Link to="/shop">
          <button
            className={`${location.pathname === "/shop"
                ? styles.selectedButton
                : styles.normalButton} && ${darkMode ? style.DarckMode : ''}`
            }
          >
            TIENDA
          </button>
        </Link>
        <Link to="/donar">
          <button
            className={`${location.pathname === "/donar"
                ? styles.selectedButton
                : styles.normalButton} && ${darkMode ? style.DarckMode : ''}`
            }
          >
            DONACIONES!
          </button>
        </Link>
        <Link to="/carrito">
          <div className={`${styles.cartIcon} ${darkMode ? style.whiteIcon : ''}`}>
            <ShoppingCartIcon fontSize="large" />
            <span className={styles.itemCount}>{carrito}</span>
          </div>
        </Link>
        <Link to="/account">
          <div className={`${styles.userIcon} ${darkMode ? style.whiteIcon : ''}`}>
            <AccountCircleSharpIcon fontSize="large" />
          </div>
        </Link>

        <button
          className={styles.normalButton}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "Modo Claro" : "Modo Oscuro"}
        </button>

      </div>
    </div>
  );
}


