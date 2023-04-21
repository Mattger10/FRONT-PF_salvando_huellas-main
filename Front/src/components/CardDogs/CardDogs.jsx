import React from "react";
import styles from "../CardDogs/CardDogs.module.css";
import { useLocation } from "react-router-dom";
//Acá traigo a todas las cards de los perros -iri-

export default function CardDogs({ photoD, nameD, ageD, sexD, sizeD, handleEdit, handleDelete, id }) { //Funciones handle vienen de AdminDogs

  // --------------------------valentin-------------------------
  const location = useLocation() // RENDERIZO DISTINTA LA CARD SI ESTAMOS EN ADMIN -- Valentin
  if(location.pathname === "/admin/dogs"){
    return (
      <>
      <div>
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
          <div>
            <button onClick={handleEdit}>EDITAR</button>
            <button onClick={()=>{handleDelete(id)}}>ELIMINAR</button>
          </div>
        </div>
      </div>
    </>
    )
  }

  return (
    <>
    <div className={styles.container}>
          <h3 className={styles.h3}>{nameD}</h3>
          <img className={styles.img} src={photoD} alt="img" />
          <h4>Edad:</h4>
          <p>{ageD}</p>
          <h4>Tamaño:</h4>
          <p>{sizeD}</p>
          <h4>Sexo:</h4>
          <p>{sexD}</p>
    </div>
  </>
  )
}

