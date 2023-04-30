import React, { useState, useEffect } from "react";
import styles from "./Article.module.css";
import { addCarrito } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailArticle, getOpinions } from "../../redux/actions";
import Opinions from "../Opinions/Opinions";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";

export default function DetailsArticle() {
  const detail = useSelector((state) => state.detailArticle);
  const [cantidad, setCantidad] = useState(1);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { isAuthenticated } = useAuth0();
  const [isLogged, setIsLogged] = useState(true);
  const userIdLocal = JSON.parse(window.localStorage.getItem("user")).id_User;
  const [userHasOpinion, setUserHasOpinion] = useState(false);
  const allOpinions = useSelector((state) => state.opinions);

  // Opinion form info:
  const [opinionInfo, setOpinionInfo] = useState({
    stars: 0,
    text: "",
  });

  const { id } = useParams();

  useEffect(() => {
    allOpinions.forEach((opinion) => {
      console.log("OPINION: ", opinion);
      console.log("USER ID LOCAL: ", userIdLocal);
      if (opinion.userId === userIdLocal) {
        if (opinion.articleId === Number(id)) {
          setUserHasOpinion(true);
        }
      }
    });
  }, [allOpinions]);

  let stockOptions = [];
  for (let i = 0; i < detail.stockA; i++) {
    stockOptions.push(i + 1);
  }

  const handleStockSelect = (e) => {
    setCantidad(e.target.value);
  };

  const handleAdd = (e) => {
    let repeated = false;
    const carritoStorage = window.localStorage.getItem("carrito");
    if (carritoStorage) {
      JSON.parse(carritoStorage).forEach((artic) => {
        if (artic.article.nameA === detail.nameA) {
          repeated = true;
        }
      });
      if (!repeated) {
        dispatch(addCarrito());
        window.localStorage.setItem(
          "carrito",
          JSON.stringify([
            ...JSON.parse(carritoStorage),
            {
              article: {
                nameA: detail.nameA,
                priceA: detail.priceA,
                photoA: detail.photoA,
                stockA: detail.stockA,
                id_Article: detail.id_Article,
              },
              cantidad: Number(cantidad),
            },
          ])
        );
        console.log(detail);
        setMessage("Se añadió al carrito");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setMessage("Ya agregaste este artículo");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      }
    } else {
      window.localStorage.setItem(
        "carrito",
        JSON.stringify([
          {
            article: { nameA, priceA, photoA, stockA },
            cantidad: Number(cantidad),
          },
        ])
      );
    }
  };

  const handleOpinionSubmit = (e) => {
    e.preventDefault();
    const userToken = window.localStorage.getItem("token");
    const config = { headers: { authorization: userToken } };
    axios
      .post(
        "/opinions/register/" + id,
        {
          commentO: opinionInfo.text,
          qualificationO: Math.round(opinionInfo.stars / 20) || 1,
          stars: opinionInfo.stars,
          userId: userIdLocal,
        },
        config
      )
      .then((res) => {
        // actualizar la lista de opiniones con la nueva opinión
        dispatch(getOpinions());
        // limpiar el formulario
        setOpinionInfo({ stars: 0, text: "" });
      })
      .catch((error) => console.log(error.message));
  };

  const handleOpinionChange = (e) => {
    setOpinionInfo({
      ...opinionInfo,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    dispatch(detailArticle(id));
    dispatch(getOpinions());
  }, []);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (!user) {
      setIsLogged(false);
    } else if (!user.nameU) setIsLogged(false);
  }, []);

  return (
    <div>
      <div className={styles.detailsArticle}>
        <div className={styles.detailsLeft}>
          <img
            className={styles.img}
            src={detail.photoA}
            alt={"foto de " + detail.nameA}
          />
        </div>

        <div className={styles.detailsRight}>
          <h3>{detail.nameA}</h3>
          <p className={styles.price}>$ {detail.priceA}</p>
          <p className={styles.description}>{detail.descriptionA}</p>
          {detail.stockA > 1 ? (
            <p>{detail.stockA} disponibles</p>
          ) : (
            <p>Último disponible!</p>
          )}
          <select onChange={handleStockSelect} className={styles.stockSelect}>
            {stockOptions.map((num, ind) => {
              return <option key={ind}>{num}</option>;
            })}
          </select>
          <button className={styles.button} onClick={handleAdd}>
            Agregar al carrito
          </button>
          {message.length ? <p>{message}</p> : ""}
        </div>
      </div>
      <div className={styles.opinions}>
        <Opinions />
      </div>
      {isLogged || isAuthenticated ? (
        !userHasOpinion ? (
          <div className={styles.containerOpinion}>
            <h3>Deja tu opinión sobre este artículo</h3>
            <form onSubmit={handleOpinionSubmit}>
              <label>
                Calificación:
                <input
                  type="range"
                  onChange={handleOpinionChange}
                  value={opinionInfo.stars}
                  name="stars"
                />
              </label>
              <label>
                Comentario
                <textarea
                  placeholder="Escribe tu opinión..."
                  onChange={handleOpinionChange}
                  value={opinionInfo.text}
                  name="text"
                />
              </label>
              <button type="submit">Enviar</button>
            </form>
          </div>
        ) : (
          <div>
            <h3>Gracias por tu opinion!</h3>
          </div>
        )
      ) : (
        <div>
          <h4>Inicia sesión para opinar sobre este producto</h4>
        </div>
      )}
    </div>
  );
}
