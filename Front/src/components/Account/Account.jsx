import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./Account.module.css";
import { getAdoptions, getCarts, getDogs } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Account = () => {
  const [auth, setAuth] = useState(null);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();

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

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });
      if (response.ok) {
        // actualiza la imagen del avatar
      } else {
        console.error("Error al cargar la imagen del avatar");
      }
    };
    input.click();
  };

  const handleLogout = () => {
    if (userLocal.nameU || isAuthenticated) {
      let response = confirm("¿Está seguro que desea salir de la sesión?");
      if (response === true) {
        window.localStorage.setItem("carrito", JSON.stringify([]));
        window.localStorage.setItem("user", JSON.stringify({}));
        window.localStorage.removeItem("token");
        logout({ returnTo: "/" });
      }
    } else navigate("/");
  };

  const sumTotal = (articles)=>{
    let total = 0
    articles.forEach(art => total += (art.quantity * art.unit_price))
    return total
  }

  return (
    <div className={styles.container}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://necolas.github.io/normalize.css/8.0.1/normalize.css"
      />
      <link
        rel="stylesheet"
        href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
        integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
        crossOrigin="anonymous"
      />
      <div className={styles.perfil}>
        <div className={styles.portada}>
          {isAuthenticated ? (
            <div className={styles.avatar}>
              <img className={styles.img} src={user.picture} alt={user.name} />
              <button
                className={styles.botonAvatar}
                type="button"
                onClick={handleImageUpload}
              >
                <i className="far fa-image"></i>
              </button>
            </div>
          ) : userLocal.nameU ? (
            <div className={styles.avatar}>
              <img className={styles.img} src={defaultProfilePic} alt={userLocal.nameU} />
              <button
                className={styles.botonAvatar}
                type="button"
                onClick={handleImageUpload}
              >
                <i className="far fa-image"></i>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={styles.perfilBody}>
        {isAuthenticated && (
          <div className={styles.perfilBio}>
            <h3 className={styles.titulo}>{user.name}</h3>
            <p className={styles.texto}>Email: {user.email}</p>
          </div>
        )}
        {userLocal.nameU && !isAuthenticated ? (
          <div className={styles.perfilBio}>
            <h3 className={styles.titulo}>
              {userLocal.nameU + " " + userLocal.lastNameU}
            </h3>
            <p className={styles.texto}>Email: {userLocal.emailU}</p>
          </div>
        ) : (
          ""
        )}
        <div className={styles.perfilUsuarioFooter}>
          <ul className={styles.listaDatos}>
            <li> Mis donaciones:</li>
          </ul>
          <ul className={styles.listaDatos}>
            <li>Mis favoritos:</li>
          </ul>
          <div>
            <h4>
            Mis compras:
            </h4>
            {carts.map((cart) => (
              <div key={cart.id_Article} className={styles.compra}>
                <p>{"Compra ID #"+cart.id_Cart}</p>
                <p>{cart.createdAt.slice(0, 10)}</p>
                <p>Productos: {cart.articles.map((art, index)=>{
                    return <p key={index}>{art.quantity+" "+art.title+" $"+art.unit_price * art.quantity}</p>
                  })}</p>
                  <p>Total: ${sumTotal(cart.articles)}</p>
              </div>
            ))}
          </div>
          <div>
            <h4>
            Mis adopciones:
            </h4>
            {updatedAdoptions.map((id_Adoption, index) => (
              <ul key={index}>
                {" "}
                <li >
                  Tipo de solicitud: {id_Adoption.adopted_homeA === "adopt" ? "Adopción" : "Hogar Provisorio"}
                </li>
                <li >
                  Estado: {id_Adoption.statusA ? "Aceptada" : "En revisión"}
                </li>
                <li >Perro: {id_Adoption.dogName}</li>
              </ul>
            ))}
          </div>
        </div>
        {userLocal.isAdminU && (
          <button onClick={goAdminArticles} className={styles.button}>
            Gestionar Artículos
          </button>
        )}
        {userLocal.isAdminU && (
          <button onClick={goAdminDogs} className={styles.button}>
            Gestionar Perritos
          </button>
        )}
        {userLocal.isAdminU && (
          <button onClick={goAdminUsers} className={styles.button}>
            Gestionar Usuarios
          </button>
        )}
        {/* <button className={styles.button} onClick={toggleEditingProfile}>
          {editingProfile ? "Cancelar edición" : "Editar perfil"}
        </button> */}
        {message && <div className={styles.notification}>{message}</div>}
        <button className={styles.button} onClick={handleLogout}>
          {isAuthenticated || userLocal.nameU
            ? "Cerrar sesión"
            : "Iniciar Sesion"}
        </button>
      </div>
    </div>
  );
};

export default Account;
