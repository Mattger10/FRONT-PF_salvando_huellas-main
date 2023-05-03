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
  const loader = <div className={styles.customloader}></div>

  const bringReferences = async () => {
    const resp = await axios.get("/references");
    const { allReferences, allDogsReferences } = resp.data;
    setReferences(allReferences);
    setDogsRefsRelation(allDogsReferences);
  };

  useEffect(() => {
    dispatch(getDetail(id));
    bringReferences();

    return async () => dispatch(getDetail(null))
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
                <img
                  className={styles.imagen}
                  src={DogDeits.photoD}
                  alt={DogDeits.nameD}
                />
                <h2 style={{ fontFamily: "Cat Paw" }} className={styles.name} >{DogDeits.nameD}</h2>
              </div>

              <div className={styles.description}>
                <span>Edad: {translateData(DogDeits.ageD)}</span>
                <span>Sexo: {translateData(DogDeits.sexD)}</span>
                <span>Tamaño: {translateData(DogDeits.sizeD)}</span>
                <span >Historia: {DogDeits.historyD}</span>
                <br />
                <span className={styles.reference} >
                  Referencias:
                  <ul>
                    {showReferences}
                  </ul>
                </span>
              </div>
                <div className={styles.adoptame}>
                  <Link to="/dogs">
                    <button className={styles.button}>Atrás</button>
                  </Link>
                  <Link to="/adopt">
                    <button className={styles.button}>Adóptame!</button>
                  </Link>
                </div>
            </div>
          ) : (
            loader
          )}
        </div>

        <div className={styles.containAdop}></div>
      </div>
    </div>
  );
}
