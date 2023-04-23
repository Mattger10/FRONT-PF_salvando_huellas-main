import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail, getReferences } from "../../redux/actions";
import styles from "../DetailDog/DetailDog.module.css";

export default function DetailDogs() {
  const dispatch = useDispatch();
  const DogDeits = useSelector((state) => state.dogDetail);
  const references = useSelector((state) => state.references);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(getReferences());
  }, [dispatch, id]);

  console.log("dogDeits", DogDeits);

  return (
    <div className={styles.containerAll}>
      <div className={styles.huella}>
      <div className={styles.container}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap"
          rel="stylesheet"
        ></link>
        <div className={styles.cardContainer}>
          {Object.keys(DogDeits).length > 0 ? (


  return (
    <div className={styles.detalleBackground}>
      <div>
        {Object.keys(DogDeits).length > 0 ? (
          <div className={styles.Detail}>

            <div>
              <div className={styles.header}>
                <Link className={styles.adoptame} to="/adopt">
                  <a href="">
                    <img
                      className={styles.imagen}
                      src={DogDeits.photoD}
                      alt={DogDeits.nameD}
                    />
                  </a>
                </Link>
                <h2>{DogDeits.nameD}</h2>
              </div>

              <div className={styles.description}>
                <span>Age: {DogDeits.ageD}</span>
                <span>Sex: {DogDeits.sexD}</span>
                <span>Size: {DogDeits.sizeD}</span>
                <span>Historia: {DogDeits.historyD}</span>
                <span>References: {DogDeits.referencesD}</span>
                <Link className={styles.adoptame} to="/dogs">
                  <button className={styles.button}>Atrás</button>
                </Link>
                <Link className={styles.adoptame} to="/adopt">
                  <button className={styles.button}>Adóptame</button>
                </Link>
              </div>
            </div>

          ) : (
            <div>
              {/* va a ir un logo/gif de carga y quizas se cambie el "Cargando" */}
              <p>Cargando</p>

            <img
              className={styles.imagen}
              src={DogDeits.photoD}
              alt={DogDeits.nameD}
            />
            <div className={styles.stats}>
              <span>Edad: {DogDeits.ageD}</span>
              <span>Sexo: {DogDeits.sexD}</span>
              <span>Tamaño: {DogDeits.sizeD}</span>
              <span>Historia: {DogDeits.historyD}</span>
              <div>
                Referencias:
                <ul>
                  {references.map((references) => (
                    <li key={references.id}>{references.textR}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </div>
        <div className={styles.containAdop}></div>
      </div>


      <div className={styles.containAdop}>
        <button>
          <Link className={styles.adoptame} to="/adopt">
            Adóptame
          </Link>
        </button>

      </div>
    </div>
  );
}
