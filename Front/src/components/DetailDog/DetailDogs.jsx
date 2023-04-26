import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getDetail } from "../../redux/actions";
import styles from "../DetailDog/DetailDog.module.css";
import axios from "axios";
import translateData from "../../utils/translateData";

export default function DetailDogs() {
  const dispatch = useDispatch();
  const DogDeits = useSelector((state) => state.dogDetail);
  const [references, setReferences] = useState([]);
  const [dogsRefsRelation, setDogsRefsRelation] = useState([]);
  const { id } = useParams();

  const bringReferences = async () => {
    const resp = await axios.get("/references");
    const { allReferences, allDogsReferences } = resp.data;
    setReferences(allReferences);
    setDogsRefsRelation(allDogsReferences);
  };

  useEffect(() => {
    dispatch(getDetail(id));
    bringReferences();
  }, [dispatch, id]);

  const showReferences = dogsRefsRelation.map((relation, index) => {
    if (relation.dogIdDog === Number(id)) {
      let result;
      references.forEach((reference) => {
        if (reference.id_Reference === relation.referenceIdReference) {
          result = <li key={index}>{reference.textR}</li>;
        }
      });
      return result;
    }
  });
  return (
    <div className={styles.containerAll}>
      <div className={styles.huella} />
      <div className={styles.container}>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans&display=swap"
          rel="stylesheet"
        ></link>
        <div className={styles.cardContainer}>
          {Object.keys(DogDeits).length > 0 ? (
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
                <span>Edad: {translateData(DogDeits.ageD)}</span>
                <span>Sexo: {translateData(DogDeits.sexD)}</span>
                <span>Tamaño: {translateData(DogDeits.sizeD)}</span>
                <span >Historia: {DogDeits.historyD}</span>
                <span className={styles.reference} >
                Referencias:
                <ul>
                  {references.map((references) => (
                    <li key={references.id}>{references.textR}</li>
                  ))}
                </ul>
              </span>
                <Link className={styles.adoptame} to="/dogs">
                  <button className={styles.button}>Atrás</button>
                </Link>
                <Link className={styles.adoptame} to="/adopt">
                  <button className={styles.button}>Adóptame!</button>
                </Link>
              </div>

            </div>
          ) : (
            <div>
              {/* va a ir un logo/gif de carga y quizas se cambie el "Cargando" */}
              <p>Cargando</p>
            </div>
          )}
        </div>

        <div className={styles.containAdop}></div>
      </div>
    </div>
  );
}
