import React from "react";
import styles from "../CardDogs/CardDogs.module.css";
//Acá traigo a todas las cards de los perros -iri-
export default function CardDogs({  photoD, nameD, ageD, sexD, sizeD }) {
  return (
    <>
      <div className={styles.container}>
        <div>
          <h3>{nameD}</h3>
        </div>
        <div>
          <img src={photoD} alt="img" />
        </div>
        <div>
          <div>
            <h4>Age:</h4>
            <p>{ageD}</p>
          </div>
          <div>
            <h4>Size:</h4>
            <p>{sizeD}</p>
          </div>
          <div>
            <h4>Sex:</h4>
            <p>{sexD}</p>
          </div>
        </div>
      </div>
    </>
  );
}

