import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Account.module.css";
import { getAdoptions, getCarts, getDogs } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PetsIcon from "@mui/icons-material/Pets";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import GroupSharpIcon from "@mui/icons-material/GroupSharp";

const Account = () => {
  const [auth, setAuth] = useState(null);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [showAdoptions, setShowAdoptions] = useState(false);

  const loader = <div className={styles.customloader}></div>;
  const defaultProfilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

  // -----------traigo adopciones por usuario-----
  const dispatch = useDispatch();
  const userLocal = JSON.parse(window.localStorage.getItem("user")) || {};
  const [dogs, setDogs] = useState([]);
  const adoptions = useSelector((state) => state.adoptions);

  // ----------tarigo compras por usuario----------
  const carts = useSelector((state) => state.carts);

  useEffect(() => {
    dispatch(getCarts(userLocal.id_User));
  }, [dispatch, userLocal.id_User]);

  // ---------------------
  useEffect(() => {
    dispatch(getAdoptions());
    axios
      .get("/dogs")
      .then((response) => {
        setDogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterAdoptionsByUser = (adoptions, userId) => {
    return adoptions.filter((adoption) => adoption.userId === userId);
  };

  const filteredAdoptions = filterAdoptionsByUser(adoptions, userLocal.id_User);
  const updatedAdoptions = filteredAdoptions.map((adoption) => {
    const dog = dogs.find((dog) => dog.id_Dog === adoption.dogId);
    return {
      ...adoption,
      dogName: dog ? dog.nameD : "Desconocido",
    };
  });

  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();
  {
    if (isLoading) {
      return loader;
    }
  }
  // Ir a funciones de administrador
  const goAdminArticles = () => {
    navigate("/admin/articles");
  };
  const goAdminDogs = () => {
    navigate("/admin/dogs");
  };
  const goAdminUsers = () => {
    navigate("/admin/users");
  };
  const goAdminAdoptions = () => {
    navigate("/admin/adoptions");
  };

  const handleLogout = () => {
    if (userLocal.nameU || isAuthenticated) {
      let response = confirm("¿Está seguro que desea salir de la sesión?");
      if (response === true) {
        window.localStorage.setItem("carrito", JSON.stringify([]));
        window.localStorage.setItem("user", JSON.stringify({}));
        window.localStorage.removeItem("token");
        logout({ returnTo: "https://front-pf-salvando-huellas-main.vercel.app/" });
      }
    } else navigate("/");
  };

  const sumTotal = (articles) => {
    let total = 0;
    articles.forEach((art) => (total += art.quantity * art.unit_price));
    return total;
  };

  return (
    <div className={styles.container}>
      <div>
        <div>
          {isAuthenticated ? <div></div> : userLocal.nameU ? <div></div> : ""}
        </div>
      </div>
      <div>
        {isAuthenticated && (
          <div className={styles.perfilBio}>
            <h3
              style={{ fontFamily: "JosefinSans-Italic" }}
              className={styles.titulo}
            >
              {user.name}
            </h3>
            <p className={styles.texto}>Email: {user.email}</p>
            <button className={styles.buttonEditProfile} onClick={()=>navigate("/editUserData")}>Mis datos personales</button>
          </div>
        )}
        {userLocal.nameU && !isAuthenticated ? (
          <div className={styles.perfilBio}>
            <h3
              style={{ fontFamily: "JosefinSans-Italic" }}
              className={styles.titulo}
            >
              {userLocal.nameU + " " + userLocal.lastNameU}
            </h3>
            <p className={styles.texto}>Email: {userLocal.emailU}</p>
            <button className={styles.buttonEditProfile} onClick={()=>navigate("/editUserData")}>Mis datos personales</button>
          </div>
        ) : (
          ""
        )}
        <div className={styles.perfilUsuarioFooter}>
          <ul>
            <button
              onClick={() => setShowCart(!showCart)}
              className={styles.h3}
            >
              <ShoppingCartTwoToneIcon /> Mis compras
            </button>
            {showCart && (
              <div>
                {carts.map((cart) => (
                  <div key={cart.id_Article}>
                    <p>{"Compra #" + cart.id_Cart}</p>
                    <p>{cart.createdAt.slice(0, 10)}</p>
                    <p>
                      Productos:{" "}
                      {cart.articles.map((art, index) => {
                        return (
                          <p key={index}>
                            {art.quantity +
                              " " +
                              art.title +
                              " $" +
                              art.unit_price * art.quantity}
                          </p>
                        );
                      })}
                    </p>
                    <p className={styles.p}>
                      Total: ${sumTotal(cart.articles)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </ul>
        </div>
        <div className={styles.perfilUsuarioFooter2}>
          <ul>
            <button
              className={styles.adopth3}
              onClick={() => setShowAdoptions(!showAdoptions)}
            >
              <PetsIcon /> Mis adopciones
            </button>
            {showAdoptions && (
              <div className={styles.adopcionesContainer}>
                {updatedAdoptions.map((id_Adoption, index) => (
                  <div key={index}>
                    <p>Tipo de solicitud: {id_Adoption.adopted_homeA === "adopt" ? "Adopción" : "Hogar Provisorio"} </p>
                    <p>
                      Estado:
                      {id_Adoption.statusA === "accepted"
                        ? "Aceptada"
                        : id_Adoption.statusA === "rejected"
                        ? "Rechazada"
                        : "En revisión"}
                    </p>
                    <p className={styles.p}>Perro: {id_Adoption.dogName}</p>
                  </div>
                ))}
              </div>
            )}
          </ul>
        </div>
        <div className={styles.containerButton}>
          {userLocal.isAdminU && (
            <button onClick={goAdminArticles} className={styles.button}>
              Gestionar Artículos <ProductionQuantityLimitsTwoToneIcon />
            </button>
          )}
          {userLocal.isAdminU && (
            <button onClick={goAdminDogs} className={styles.button}>
              Gestionar Perritos
            </button>
          )}
          {userLocal.isAdminU && (
            <button onClick={goAdminUsers} className={styles.button}>
              Gestionar Usuarios <GroupSharpIcon />
            </button>
          )}
          {userLocal.isAdminU && (
            <button onClick={goAdminAdoptions} className={styles.button}>
              Gestionar Adopciones
            </button>
          )}

          {message && <div className={styles.notification}>{message}</div>}
          <button className={styles.button} onClick={handleLogout}>
            {isAuthenticated || userLocal.nameU
              ? "Cerrar sesión "
              : "Iniciar Sesion"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
