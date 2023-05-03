import React, { useState, useEffect } from "react";
import styles from "./Article.module.css";
import { addCarrito } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailArticle, getOpinions } from "../../redux/actions";
import Opinions from "../Opinions/Opinions";
import { useAuth0 } from "@auth0/auth0-react";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";

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
  const loader = <div className={styles.customloader}></div>;
  const [userHasPurchased, setUserHasPurchased] = useState(false);

  // Opinion form info:
  const [opinionInfo, setOpinionInfo] = useState({
    stars: 0,
    text: "",
  });

  const { id } = useParams();

  useEffect(() => {
    allOpinions.forEach((opinion) => {
      if (opinion.userId === userIdLocal) {
        if (opinion.articleId === Number(id)) {
          setUserHasOpinion(true);
        }
      }
    });
  }, [allOpinions]);

  useEffect(() => {
    console.log("DETAIL", detail)
    if(detail.id_Article){
      axios
        .get("/carts/" + userIdLocal)
        .then((res) => res.data)
        .then((carts) => {
          carts.forEach((cart) => {
            cart.articles.forEach((art) => {
              console.log("holaaa", art)
              if (art.title === detail.nameA) {
                setUserHasPurchased(true);
              }
            });
          });
        })
        .catch((error) => console.error("ERROR: ", error.message));
    }
  }, [detail]);

  let stockOptions = [];
  for (let i = 1; i < detail.stockA; i++) {
    stockOptions.push(i);
  }

  const handleStockSelect = (e) => {
    if (e.target.value > 0 && e.target.value <= detail.stockA) {
      setCantidad(e.target.value);
    }
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

  function StarRating({ rating, onRatingChange }) {
    const MAX_RATING = 5;
    const STAR_SIZE = 25;

    const handleClick = (index) => {
      onRatingChange(index + 1);
    };

    return (
      <div>
        {Array.from({ length: MAX_RATING }, (_, index) => (
          <span
            key={index}
            style={{
              fontSize: `${STAR_SIZE}px`,
              cursor: "pointer",
              color: index < rating ? "orange" : "gray",
            }}
            onClick={() => handleClick(index)}
          >
            &#9733;
          </span>
        ))}
      </div>
    );
  }

  return (
    <div>
      {detail.photoA ? (
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

            <div className={styles.containerButtonMasyMenos}>
              <button
                className={styles.buttonMenos}
                onClick={handleStockSelect}
                value={Number(cantidad) - 1}
              >
                -
              </button>
              <span className={styles.span}>{cantidad}</span>
              <button
                className={styles.buttonMas}
                onClick={handleStockSelect}
                value={Number(cantidad) + 1}
              >
                +
              </button>
            </div>
            {detail.stockA > 1 ? (
              <p className={styles.pStock}>{detail.stockA} disponibles</p>
            ) : (
              <p>Último disponible!</p>
            )}
            <button className={styles.button} onClick={handleAdd}>
              <ShoppingCartTwoToneIcon fontSize="medium" /> Agregar al carrito
            </button>
            {message.length ? <p>{message}</p> : ""}
          </div>
        </div>
      ) : (
        loader
      )}
      <div className={styles.opinions}>
        <Opinions />
      </div>
      {isLogged || isAuthenticated ? (
        !userHasOpinion ? (
          userHasPurchased ? (
            <div className={styles.containerOpinion}>
              <h3>Deja tu opinión sobre este artículo</h3>
              <form onSubmit={handleOpinionSubmit}>
                <label>
                  Calificación:
                  <StarRating
                    rating={Math.round(opinionInfo.stars / 20)}
                    onRatingChange={(rating) =>
                      setOpinionInfo({ ...opinionInfo, stars: rating * 20 })
                    }
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
            <div className={styles.containerH3}>
              <h4>Debes comprar este artículo para dejar una reseña</h4>
            </div>
          )
        ) : (
          <div className={styles.containerH3}>
            <h3>¡Gracias por tu opinion!</h3>
          </div>
        )
      ) : (
        <div>
          <h4 className={styles.containerH3}>Inicia sesión para opinar sobre este producto</h4>
        </div>
      )}
    </div>
  );
}
